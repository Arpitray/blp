import { Author } from "../types/author";

export interface IAuthorRepository {
    // iPost will call this and get the author details
    getAuthorById(id: string): Promise<Author | null> 
    // anyone can call this to get author detials using slug link.
    getAuthorBySlug(slug: string): Promise<Author | null>
}