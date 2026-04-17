import React, { useState, useEffect, useCallback } from 'react'
import { useClient } from 'sanity'
import { useRouter } from 'sanity/router'
import { Card, Flex, Stack, Box, Text, Button, Select, Spinner, Badge } from '@sanity/ui'
import { AddIcon, DocumentIcon, WarningOutlineIcon } from '@sanity/icons'

// Core interfaces
interface SupportedLanguage {
  id: string
  title: string
}

interface LanguageVersion {
  _id: string
  language: string
  title: string
}

export function SlugEditorPane(props: any) {
  // When used as a Pane, props contains the document data
  const { document } = props
  const parentId = document.displayed._id?.replace(/^drafts\./, '')
  const slug = document.displayed.slug?.current

  const supportedLanguages = [
    { id: 'en', title: 'English' },
    { id: 'es', title: 'Spanish' },
    { id: 'fr', title: 'French' },
    { id: 'de', title: 'German' },
    { id: 'hi', title: 'Hindi' },
    { id: 'hr', title: 'Croatian' },
    { id: 'nl', title: 'Dutch' },
    { id: 'it', title: 'Italian' },
    { id: 'ja', title: 'Japanese' },
    { id: 'ko', title: 'Korean' },
    { id: 'pt', title: 'Portuguese' },
    { id: 'ru', title: 'Russian' },
    { id: 'ar', title: 'Arabic' },
    { id: 'zh', title: 'Chinese' },
    { id: 'pl', title: 'Polish' },
  ]

  const client = useClient({ apiVersion: '2024-01-01' })
  const router = useRouter()

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [actionLoading, setActionLoading] = useState(false)
  const [versions, setVersions] = useState<LanguageVersion[]>([])
  const [existingLangIds, setExistingLangIds] = useState<Set<string>>(new Set())
  const [publishedLangIds, setPublishedLangIds] = useState<Set<string>>(new Set())
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en')

  const fetchVersions = useCallback(async () => {
    if (!parentId) return
    try {
      setLoading(true)
      setError(null)
      const data = await client.fetch(
        `*[_type == "post" && metadata._ref == $parentId]{ _id, language, title }`,
        { parentId }
      )

      setVersions(data)
      const existing = new Set<string>(data.map((d: any) => d.language as string))
      const published = new Set<string>(
        data
          .filter((d: any) => !d._id.startsWith('drafts.'))
          .map((d: any) => d.language as string)
      )

      setExistingLangIds(existing)
      setPublishedLangIds(published)

      if (data.length > 0 && !existing.has('en')) {
        setSelectedLanguage(data[0].language)
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [client, parentId])

  useEffect(() => {
    fetchVersions()
  }, [fetchVersions])

  const handleCreateDraft = async () => {
    if (!parentId || !slug) return
    try {
      setActionLoading(true)

      // Find source (metadata title or existing post)
      const sourceTitle = document.displayed.title || slug

      const newDoc = await client.create({
        _type: 'post',
        metadata: { _type: 'reference', _ref: parentId },
        language: selectedLanguage,
        title: `[${selectedLanguage.toUpperCase()}] ${sourceTitle}`
      })

      setExistingLangIds(prev => new Set(prev).add(selectedLanguage))
      const newId = newDoc._id.replace(/^drafts\./, '')
      router.navigateIntent('edit', { id: newId, type: 'post' })

    } catch (err: any) {
      setError(err.message)
    } finally {
      setActionLoading(false)
    }
  }

  const handleOpenEditor = (documentId: string) => {
    const cleanId = documentId.replace(/^drafts\./, '')
    router.navigateIntent('edit', { id: cleanId, type: 'post' })
  }

  const selectedTitle = supportedLanguages.find(l => l.id === selectedLanguage)?.title || selectedLanguage
  const versionForSelected = versions.find(v => v.language === selectedLanguage)

  if (!parentId) {
    return (
      <Box padding={4}>
        <Text muted>Save the metadata record first to manage translations.</Text>
      </Box>
    )
  }

  return (
    <Flex direction="column" style={{ height: '100%' }}>
      <Card padding={4} borderBottom>
        <Flex justify="space-between" align="center">
          <Box>
            <Text weight="bold" size={2}>Translations</Text>
            <Text muted size={1} style={{ marginTop: '8px' }}>
              {existingLangIds.size} of {supportedLanguages.length} languages created
            </Text>
          </Box>
          <Box>
            <Select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.currentTarget.value)}
            >
              {supportedLanguages.map(lang => {
                const exists = existingLangIds.has(lang.id)
                const isPublished = publishedLangIds.has(lang.id)
                let status = exists ? (isPublished ? '✓' : '(Draft)') : '—'
                return (
                  <option key={lang.id} value={lang.id}>
                    {lang.title} {status}
                  </option>
                )
              })}
            </Select>
          </Box>
        </Flex>
      </Card>

      <Box flex={1} padding={4} style={{ overflowY: 'auto' }}>
        {loading ? (
          <Flex direction="column" align="center" justify="center" gap={3} style={{ height: '200px' }}>
            <Spinner muted />
            <Text muted>Fetching versions...</Text>
          </Flex>
        ) : error ? (
          <Card tone="critical" padding={4} radius={2}>
            <Text>{error}</Text>
          </Card>
        ) : versionForSelected ? (
          <Stack space={4}>
            <Button
              tone="primary"
              text={`Open ${selectedTitle} version in editor`}
              icon={DocumentIcon}
              onClick={() => handleOpenEditor(versionForSelected._id)}
              style={{ padding: '16px' }}
            />
            <Card padding={3} radius={2} border>
              <Flex justify="space-between" align="center">
                <Text weight="semibold">{versionForSelected.title}</Text>
                <Flex gap={2}>
                  {!publishedLangIds.has(selectedLanguage) && (
                    <Badge mode="default" tone="caution">DRAFT</Badge>
                  )}
                  <Badge mode="outline" tone="primary">{selectedLanguage?.toUpperCase()}</Badge>
                </Flex>
              </Flex>
            </Card>
          </Stack>
        ) : (
          <Stack space={4}>
            <Card tone="caution" padding={4} radius={2}>
              <Flex align="center" gap={3}>
                <Text size={2}><WarningOutlineIcon /></Text>
                <Text>No {selectedTitle} translation exists yet.</Text>
              </Flex>
            </Card>
            <Button
              tone="primary"
              icon={actionLoading ? undefined : AddIcon}
              text={actionLoading ? `Creating...` : `Create ${selectedTitle} translation`}
              disabled={actionLoading}
              onClick={handleCreateDraft}
            />
          </Stack>
        )}
      </Box>
    </Flex>
  )
}
