export interface PageTranslations {
    // Shared
    backButton: string;

    // FAQs
    faqsTitle: string;
    faqItems: { q: string; a: string }[];

    // Data Deletion
    dataDeletionTitle: string;
    dataDeletionLastUpdated: string;

    // Addiction Test
    addictionTestTitle: string;
    addictionTestIntro: string;
    addictionTestBeforeTitle: string;
    addictionTestBeforeIntro: string;
    addictionTestBeforeNote: string;
    addictionTestBeforePoints: string[];
    addictionTestQuestions: string[];

    // Terms & Conditions
    termsTitle: string;

    // Premium
    premiumHeroTitle: string[];
    premiumHeroCta: string;
    premiumSubheading: string;
    premiumFreeForever: string;
    premiumAnnual: string;
    premiumAnnualPrice: string;
    premiumMonthly: string;
    premiumMonthlyPrice: string;
    premiumSave: string;
    premiumCta: string;
    premiumFeatures: string[];
}

const T: Record<string, PageTranslations> = {
    en: {
        backButton: 'Back',
        faqsTitle: 'FAQs',
        faqItems: [
            { 
                q: 'What is BlockP?', 
                a: 'BlockP is the best porn blocker app and software for your devices that not only restricts adult content but also social media applications, gaming websites and other unwanted content. This intuitive software can help to steer clear of pornographic content on the Internet and help you improve your productivity and focus. With features like real-time blocking, multi-platform availability, customizable filtering, password protection, uninstall prevention and helpful community support, you can bid adieu to mature content.' 
            },
            { 
                q: 'How to block porn permanently?', 
                a: 'Using a blocking system is the best way to get rid of adult content permanently. Use an effective app like BlockP that not only blocks adult content websites but also has features that let you customize your settings. It is an accurate app that provides web filtering, app blocking, and password protection.' 
            },
            { 
                q: 'Is BlockP safe?', 
                a: 'BlockP is developed to be a safe and effective tool for blocking adult content on websites and devices with customisable user settings and strong security.' 
            },
            { 
                q: 'Can I uninstall BlockP from my phone?', 
                a: 'BlockP has a feature that, upon enabling, prevents the uninstallation of the app. This ensures that the users stay consistent and control urges to access adult content.' 
            },
            { 
                q: 'What platform BlockP is available?', 
                a: 'BlockP offers multi-platform availability. It is free to download and use on several platforms, including Android and iOS phones, as well as Windows and macOS laptops. It is also available as a Chrome extension.' 
            },
            { 
                q: 'Can BlockP block all porn content?', 
                a: 'Yes, our strong and effective porn blocker is equipped with a combination of features such as VPN Detection which enforces content blocking even when users hide their IP addresses and an accessibility service that can take control of your entire device and monitor your activity so that there is no way to trick the porn blocker.\n\nBlockP is an online porn blocker that uses advanced technology to analyze the information given on a webpage or app and blocks adult content in real-time throughout your device. It uses a complex algorithm to observe user activity, processing more than 10 queries per second to ensure effective blocking.' 
            },
            { 
                q: 'What all features are available on BlockP?', 
                a: 'Designed as a powerful porn blocker app, BlockP helps you to manage online distractions with its effective features like –\n\n• Custom Blocking – Offers customizable filtering, allowing users to block the exact websites, keywords, and content they don’t want to see.\n• VPN Detection – Detects the use of VPN and enforces content blocking even when users hide their IP addresses\n• AI Blocking – Analyzes the entire web page for adult content and blocks it if detected.\n• Safe Search – Filters explicit websites from search engine results and blocks websites that contain harmful content\n• Real-Time Content Detection – Analyze an app or website and block adult content in real time throughout your device.\n• Block images and videos – Hides inappropriate images and videos on web pages.\n• Focus Mode – Helps reduce your urges when you feel like giving up. It locks your phone for a set period and allows you to access selected apps.\n• Community Forum – Safe space for users to discuss their thoughts and share their stories to encourage each other on their journey.\n• Prevent Uninstall – The porn blocker extension cannot be uninstalled without authorization. It prevents users from dodging the content restrictions.\n• Password Protection – An extra layer of security can be added by setting a password to modify the settings.\n• Unlimited Devices – Porn blocker extension can be used across multiple devices under a single account.' 
            },
            { 
                q: 'Can BlockP block custom websites?', 
                a: 'You can block any website you find distracting, not limited to pornographic material. If you find yourself spending too much time on a certain game, reading Wattpad stories, or any other distracting site during your productive hours, you can use BlockP’s customizable blocking option. All you need to do is copy the URL of the website you want to restrict and add it to the blacklist.' 
            },
            { 
                q: 'How to prevent uninstallation?', 
                a: 'Step 1: Download the BlockP app on your device and scroll to the advanced blocking option.\nStep 2: Look for the prevent uninstall option and toggle it on.\nStep 3: You will get a prompt to activate device admin apps. Enter the verification code displayed and click on “Activate”.\n\nOnce it is activated, if you try to uninstall BlockP, it displays a message stating the reason for the block and the goal you set.' 
            },
            { 
                q: 'Why is BlockP accessibility stopping?', 
                a: 'BlockP accessibility might keep stopping due to your phone’s aggressive background service management. Usually, if your phone has battery optimization features, it tends to close background apps and services to save power. This can disable accessibility services which rely on working in the background to block content effectively.' 
            },
            { 
                q: 'How does BlockP app use AI to detect adult content?', 
                a: 'BlockP uses artificial intelligence to detect mature content through a pre-built model trained on several images. This model can identify nudity to any extent. Since all processing is performed directly on your device, you are assured of complete privacy and security.' 
            },
            { 
                q: 'How to block porn on Android and iOS?', 
                a: '1. Download BlockP from the official website or install it from the App Store.\n2. Enable accessibility services to let the App monitor and filter content.\n3. Turn on SafeSearch enforcement for search engines.\n4. For iOS, configure the App to block porn on Safari.\n\nBlockP’s essential features are free to use, and you can opt for the premium features if needed.' 
            },
            { 
                q: 'How to block porn on Chrome?', 
                a: '1. Open the Chrome Webstore and search for the ‘BlockP – AI Porn Blocker’ extension.\n2. Click “Add to Chrome” and confirm.\n3. Click the BlockP icon in your toolbar to access settings and enable AI content filtering.' 
            }
        ],
        dataDeletionTitle: 'Securely delete your data on the BlockP android app',
        dataDeletionLastUpdated: 'Last updated: 26 February, 2024',
        addictionTestTitle: 'Anonymous addiction test',
        addictionTestIntro: 'Do you find that your pornography use has become compulsive? Our anonymous assessment tool can help you review your relationship with pornography and present a personalized report on its impact. This online comprehensive test will take approximately 10 to 15 minutes to complete, and results come with valuable suggestions.',
        addictionTestBeforeTitle: 'Before taking the test,',
        addictionTestBeforeIntro: 'This test can evaluate if your pornography use has turned into a fully fledged addiction. It\'s not always straightforward to figure out when porn usage becomes an addiction.',
        addictionTestBeforeNote: 'Before you take the test,',
        addictionTestBeforePoints: [
            'Understand your behaviour - Recognize when you get urges and how often they occur.',
            'Recognize any relationship problems caused by your behaviour.',
            'Think about any other mental health illnesses you have, such as depression or anxiety.',
            'Set your mind to be honest, as taking the test is for your own good, to understand if you have an addiction and take steps to recover.',
            'Note personal information, including any recent events, current stresses and recent life shifts.',
        ],
        addictionTestQuestions: [
            'Do you spend more than 1 hour daily viewing pornographic content?',
            'Have you missed work or school commitments due to watching porn?',
            'Do you feel involved when unable to access pornographic content?',
            'Has your pornography consumption increased over the past year?',
            'Do you hide your porn viewing habits from family/partners?',
            'Have you tried to stop watching porn but failed?',
            'Do you view porn in inappropriate situations (work, driving, public places)?',
            'Has porn affected your intimate relationships?',
            'Do you feel guilty or ashamed after viewing porn?',
            'Have you experienced sexual dysfunction related to porn use?',
            'Do you prioritize porn over social activities?',
            'Has your porn content escalated to more extreme material over time?',
            'Do you use porn to cope with stress or negative emotions?',
            'Have you experienced financial problems due to paid porn content?',
            'Do you feel you need professional help for your porn usage?',
        ],
        termsTitle: 'Terms & Conditions',
        premiumHeroTitle: ['BlockP', 'Premium'],
        premiumHeroCta: 'Start your free trial',
        premiumSubheading: 'One subscription to keep you\nsafe across all your devices',
        premiumFreeForever: 'Free forever',
        premiumAnnual: 'Annual',
        premiumAnnualPrice: '$29.99 / billed annually',
        premiumMonthly: 'Monthly',
        premiumMonthlyPrice: '$4.99 / mo',
        premiumSave: 'Save 40%',
        premiumCta: 'Start your free trial',
        premiumFeatures: ['Standard Blocking', 'AI Blocking', 'No Ads', 'Social Media Blocking', 'Custom Redirects', 'Unlimited devices', 'FREE TRIAL'],
    },
    es: {
        backButton: 'Volver',
        faqsTitle: 'Preguntas frecuentes',
        faqItems: [
            { q: '¿Qué es BlockP?', a: 'BlockP es una solución premium de bloqueo de contenido diseñada para ayudarte a mantener el enfoque y desarrollar mejores hábitos digitales.' },
            { q: '¿Es seguro BlockP?', a: 'Sí, BlockP es completamente seguro. Priorizamos la privacidad del usuario y la seguridad de los datos.' },
            { q: '¿Cómo funciona BlockP?', a: 'BlockP utiliza servicios de accesibilidad avanzados y filtrado local para identificar y bloquear contenido restringido en tiempo real.' },
            { q: '¿En qué plataforma está disponible BlockP?', a: 'Actualmente, BlockP está disponible para dispositivos Android.' },
            { q: '¿Puede BlockP bloquear todo el contenido pornográfico?', a: 'Si bien nos esforzamos por lograr una cobertura del 100%, BlockP utiliza una combinación de bloqueo de base de datos y análisis heurístico.' },
            { q: '¿Qué funciones están disponibles en BlockP?', a: 'Las funciones incluyen bloqueo de contenido adulto, lista negra de sitios web personalizados, protección contra desinstalación y estadísticas de uso detalladas.' },
            { q: '¿Puede BlockP bloquear sitios web personalizados?', a: 'Sí, puedes agregar cualquier URL específica a tu lista de bloqueo personalizada.' },
            { q: '¿Cómo evitar desinstalar BlockP de tu teléfono?', a: 'BlockP incluye una función de "Protección contra desinstalación" que hace que sea más difícil eliminar la aplicación.' },
            { q: '¿Por qué se detiene la accesibilidad de BlockP?', a: 'A veces, la configuración de optimización de batería de Android puede matar los servicios en segundo plano.' },
        ],
        dataDeletionTitle: 'Eliminar tus datos de forma segura en la app de BlockP para Android',
        dataDeletionLastUpdated: 'Última actualización: 26 de febrero de 2024',
        addictionTestTitle: 'Prueba de adicción anónima',
        addictionTestIntro: '¿Sientes que tu uso de pornografía se ha vuelto compulsivo? Nuestra herramienta de evaluación anónima puede ayudarte a revisar tu relación con la pornografía.',
        addictionTestBeforeTitle: 'Antes de realizar la prueba,',
        addictionTestBeforeIntro: 'Esta prueba puede evaluar si tu uso de pornografía se ha convertido en una adicción completa.',
        addictionTestBeforeNote: 'Antes de realizar la prueba,',
        addictionTestBeforePoints: [
            'Comprende tu comportamiento: reconoce cuándo tienes impulsos y con qué frecuencia ocurren.',
            'Reconoce cualquier problema de relación causado por tu comportamiento.',
            'Piensa en cualquier otra enfermedad de salud mental que tengas.',
            'Sé honesto contigo mismo al realizar la prueba.',
            'Anota información personal, incluyendo eventos recientes y cambios de vida.',
        ],
        addictionTestQuestions: [
            '¿Pasas más de 1 hora al día viendo contenido pornográfico?',
            '¿Has faltado al trabajo o a la escuela por ver pornografía?',
            '¿Te sientes ansioso cuando no puedes acceder a contenido pornográfico?',
            '¿Ha aumentado tu consumo de pornografía durante el último año?',
            '¿Ocultas tus hábitos de visualización de pornografía a familia/pareja?',
            '¿Has intentado dejar de ver pornografía pero fallado?',
            '¿Ves pornografía en situaciones inapropiadas?',
            '¿Ha afectado la pornografía a tus relaciones íntimas?',
            '¿Te sientes culpable o avergonzado después de ver pornografía?',
            '¿Has experimentado disfunción sexual relacionada con el uso de pornografía?',
            '¿Priorizas la pornografía sobre las actividades sociales?',
            '¿Tu contenido pornográfico ha escalado a material más extremo con el tiempo?',
            '¿Usas la pornografía para hacer frente al estrés o emociones negativas?',
            '¿Has tenido problemas financieros debido a contenido pornográfico de pago?',
            '¿Sientes que necesitas ayuda profesional para tu uso de pornografía?',
        ],
        termsTitle: 'Términos y Condiciones',
        premiumHeroTitle: ['BlockP', 'Premium'],
        premiumHeroCta: 'Comienza tu prueba gratuita',
        premiumSubheading: 'Una suscripción para mantenerte seguro en todos tus dispositivos',
        premiumFreeForever: 'Gratis para siempre',
        premiumAnnual: 'Anual',
        premiumAnnualPrice: '$29.99 / facturado anualmente',
        premiumMonthly: 'Mensual',
        premiumMonthlyPrice: '$4.99 / mes',
        premiumSave: 'Ahorra 40%',
        premiumCta: 'Comienza tu prueba gratuita',
        premiumFeatures: ['Bloqueo estándar', 'Bloqueo de IA', 'Sin anuncios', 'Bloqueo de redes sociales', 'Redirecciones personalizadas', 'Dispositivos ilimitados', 'PRUEBA GRATUITA'],
    },
    fr: {
        backButton: 'Retour',
        faqsTitle: 'FAQ',
        faqItems: [
            { q: "Qu'est-ce que BlockP?", a: "BlockP est une solution premium de blocage de contenu conçue pour vous aider à maintenir votre concentration." },
            { q: "BlockP est-il sûr?", a: "Oui, BlockP est entièrement sûr. Nous priorisons la confidentialité des utilisateurs et la sécurité des données." },
            { q: "Comment fonctionne BlockP?", a: "BlockP utilise des services d'accessibilité avancés et un filtrage local pour identifier et bloquer le contenu restreint." },
            { q: "Sur quelle plateforme BlockP est-il disponible?", a: "Actuellement, BlockP est disponible pour les appareils Android." },
            { q: "BlockP peut-il bloquer tout le contenu pornographique?", a: "BlockP utilise une combinaison de blocage par base de données et d'analyse heuristique." },
            { q: "Quelles fonctionnalités sont disponibles sur BlockP?", a: "Les fonctionnalités comprennent le blocage de contenu adulte, la liste noire de sites Web personnalisés et la protection contre la désinstallation." },
            { q: "BlockP peut-il bloquer des sites Web personnalisés?", a: "Oui, vous pouvez ajouter n'importe quelle URL spécifique à votre liste de blocage personnalisée." },
            { q: "Comment ne pas désinstaller BlockP de votre téléphone?", a: "BlockP comprend une fonctionnalité de protection contre la désinstallation." },
            { q: "Pourquoi l'accessibilité BlockP s'arrête-t-elle?", a: "Parfois, les paramètres d'optimisation de la batterie d'Android peuvent tuer les services en arrière-plan." },
        ],
        dataDeletionTitle: 'Supprimez vos données en toute sécurité sur l\'application BlockP Android',
        dataDeletionLastUpdated: 'Dernière mise à jour: 26 février 2024',
        addictionTestTitle: 'Test de dépendance anonyme',
        addictionTestIntro: 'Trouvez-vous que votre utilisation de la pornographie est devenue compulsive? Notre outil d\'évaluation anonyme peut vous aider.',
        addictionTestBeforeTitle: 'Avant de passer le test,',
        addictionTestBeforeIntro: 'Ce test peut évaluer si votre utilisation de la pornographie s\'est transformée en addiction.',
        addictionTestBeforeNote: 'Avant de passer le test,',
        addictionTestBeforePoints: [
            'Comprenez votre comportement - Reconnaissez quand vous avez des envies.',
            'Reconnaissez les problèmes relationnels causés par votre comportement.',
            'Pensez aux autres maladies mentales que vous pourriez avoir.',
            'Soyez honnête avec vous-même.',
            'Notez les informations personnelles pertinentes.',
        ],
        addictionTestQuestions: [
            'Passez-vous plus d\'1 heure par jour à regarder du contenu pornographique?',
            'Avez-vous manqué des engagements professionnels ou scolaires à cause de la pornographie?',
            'Vous sentez-vous anxieux quand vous ne pouvez pas accéder à du contenu pornographique?',
            'Votre consommation de pornographie a-t-elle augmenté au cours de la dernière année?',
            'Cachez-vous vos habitudes de visionnage à votre famille/partenaire?',
            'Avez-vous essayé d\'arrêter de regarder de la pornographie mais échoué?',
            'Regardez-vous de la pornographie dans des situations inappropriées?',
            'La pornographie a-t-elle affecté vos relations intimes?',
            'Vous sentez-vous coupable ou honteux après avoir regardé de la pornographie?',
            'Avez-vous connu des dysfonctionnements sexuels liés à la pornographie?',
            'Priorisez-vous la pornographie par rapport aux activités sociales?',
            'Votre contenu pornographique a-t-il évolué vers des choses plus extrêmes?',
            'Utilisez-vous la pornographie pour faire face au stress?',
            'Avez-vous eu des problèmes financiers à cause de la pornographie payante?',
            'Pensez-vous avoir besoin d\'aide professionnelle?',
        ],
        termsTitle: 'Conditions Générales',
        premiumHeroTitle: ['BlockP', 'Premium'],
        premiumHeroCta: 'Commencez votre essai gratuit',
        premiumSubheading: 'Un abonnement pour vous protéger sur tous vos appareils',
        premiumFreeForever: 'Gratuit pour toujours',
        premiumAnnual: 'Annuel',
        premiumAnnualPrice: '$29.99 / facturé annuellement',
        premiumMonthly: 'Mensuel',
        premiumMonthlyPrice: '$4.99 / mois',
        premiumSave: 'Économisez 40%',
        premiumCta: 'Commencez votre essai gratuit',
        premiumFeatures: ['Blocage standard', 'Blocage IA', 'Sans publicités', 'Blocage des réseaux sociaux', 'Redirections personnalisées', 'Appareils illimités', 'ESSAI GRATUIT'],
    },
    hi: {
        backButton: 'वापस',
        faqsTitle: 'सामान्य प्रश्न',
        faqItems: [
            { q: 'BlockP क्या है?', a: 'BlockP एक प्रीमियम कंटेंट ब्लॉकिंग समाधान है जो आपको ध्यान केंद्रित रखने और बेहतर डिजिटल आदतें बनाने में मदद करने के लिए डिज़ाइन किया गया है।' },
            { q: 'क्या BlockP सुरक्षित है?', a: 'हाँ, BlockP पूरी तरह से सुरक्षित है। हम उपयोगकर्ता की गोपनीयता और डेटा सुरक्षा को प्राथमिकता देते हैं।' },
            { q: 'BlockP कैसे काम करता है?', a: 'BlockP वास्तविक समय में प्रतिबंधित सामग्री की पहचान करने और उसे ब्लॉक करने के लिए उन्नत एक्सेसिबिलिटी सेवाओं का उपयोग करता है।' },
            { q: 'BlockP किस प्लेटफॉर्म पर उपलब्ध है?', a: 'वर्तमान में, BlockP Android डिवाइस के लिए उपलब्ध है।' },
            { q: 'क्या BlockP सभी पोर्न सामग्री को ब्लॉक कर सकता है?', a: 'BlockP अधिकांश वयस्क सामग्री को ब्लॉक करने के लिए डेटाबेस और अनुमानी विश्लेषण का उपयोग करता है।' },
            { q: 'BlockP पर कौन सी सुविधाएँ उपलब्ध हैं?', a: 'सुविधाओं में वयस्क सामग्री ब्लॉकिंग, कस्टम वेबसाइट ब्लैकलिस्टिंग, अनइंस्टॉल सुरक्षा शामिल हैं।' },
            { q: 'क्या BlockP कस्टम वेबसाइटों को ब्लॉक कर सकता है?', a: 'हाँ, आप ऐप सेटिंग में अपनी कस्टम ब्लॉकलिस्ट में कोई भी URL जोड़ सकते हैं।' },
            { q: 'अपने फ़ोन से BlockP को अनइंस्टॉल न करें?', a: 'BlockP में एक अनइंस्टॉल सुरक्षा सुविधा शामिल है।' },
            { q: 'BlockP एक्सेसिबिलिटी क्यों रुक रही है?', a: 'कभी-कभी Android की बैटरी ऑप्टिमाइज़ेशन सेटिंग्स बैकग्राउंड सेवाओं को बंद कर सकती हैं।' },
        ],
        dataDeletionTitle: 'BlockP Android ऐप पर अपना डेटा सुरक्षित रूप से हटाएं',
        dataDeletionLastUpdated: 'अंतिम अपडेट: 26 फरवरी, 2024',
        addictionTestTitle: 'गुमनाम व्यसन परीक्षण',
        addictionTestIntro: 'क्या आप पाते हैं कि अश्लील सामग्री का उपयोग बाध्यकारी हो गया है? हमारा गुमनाम मूल्यांकन उपकरण आपकी मदद कर सकता है।',
        addictionTestBeforeTitle: 'परीक्षण लेने से पहले,',
        addictionTestBeforeIntro: 'यह परीक्षण यह मूल्यांकन कर सकता है कि क्या आपका उपयोग एक पूर्ण लत में बदल गया है।',
        addictionTestBeforeNote: 'परीक्षण लेने से पहले,',
        addictionTestBeforePoints: [
            'अपने व्यवहार को समझें - पहचानें कि आपको कब और कितनी बार आग्रह होता है।',
            'अपने व्यवहार के कारण संबंध समस्याओं को पहचानें।',
            'अपनी किसी भी मानसिक स्वास्थ्य समस्या के बारे में सोचें।',
            'ईमानदार रहें क्योंकि यह परीक्षण आपके अपने भले के लिए है।',
            'व्यक्तिगत जानकारी नोट करें, जिसमें हाल की घटनाएं शामिल हैं।',
        ],
        addictionTestQuestions: [
            'क्या आप प्रतिदिन 1 घंटे से अधिक अश्लील सामग्री देखते हैं?',
            'क्या आपने पोर्न देखने के कारण काम या स्कूल की प्रतिबद्धताएं छोड़ी हैं?',
            'क्या आप अश्लील सामग्री तक पहुंचने में असमर्थ होने पर बेचैन महसूस करते हैं?',
            'क्या पिछले साल में आपकी अश्लील सामग्री की खपत बढ़ी है?',
            'क्या आप परिवार/भागीदारों से अपनी देखने की आदतें छुपाते हैं?',
            'क्या आपने पोर्न देखना बंद करने की कोशिश की लेकिन असफल रहे?',
            'क्या आप अनुचित स्थितियों में पोर्न देखते हैं?',
            'क्या पोर्न ने आपके अंतरंग संबंधों को प्रभावित किया है?',
            'क्या आप पोर्न देखने के बाद दोषी या शर्मिंदा महसूस करते हैं?',
            'क्या आपने पोर्न उपयोग से संबंधित यौन रोग का अनुभव किया है?',
            'क्या आप सामाजिक गतिविधियों से अधिक पोर्न को प्राथमिकता देते हैं?',
            'क्या आपकी पोर्न सामग्री समय के साथ अधिक चरम सामग्री तक बढ़ गई है?',
            'क्या आप तनाव से निपटने के लिए पोर्न का उपयोग करते हैं?',
            'क्या आपने भुगतान की गई पोर्न सामग्री के कारण वित्तीय समस्याओं का अनुभव किया है?',
            'क्या आपको लगता है कि आपको पेशेवर मदद की ज़रूरत है?',
        ],
        termsTitle: 'नियम और शर्तें',
        premiumHeroTitle: ['BlockP', 'प्रीमियम'],
        premiumHeroCta: 'अपना निःशुल्क परीक्षण शुरू करें',
        premiumSubheading: 'एक सदस्यता आपके सभी उपकरणों पर आपको सुरक्षित रखती है',
        premiumFreeForever: 'हमेशा के लिए मुफ़्त',
        premiumAnnual: 'वार्षिक',
        premiumAnnualPrice: '$29.99 / वार्षिक बिल',
        premiumMonthly: 'मासिक',
        premiumMonthlyPrice: '$4.99 / माह',
        premiumSave: '40% बचाएं',
        premiumCta: 'अपना निःशुल्क परीक्षण शुरू करें',
        premiumFeatures: ['मानक ब्लॉकिंग', 'AI ब्लॉकिंग', 'कोई विज्ञापन नहीं', 'सोशल मीडिया ब्लॉकिंग', 'कस्टम रीडायरेक्ट', 'असीमित डिवाइस', 'निःशुल्क परीक्षण'],
    },
};

// Fallback: all other locales default to English
export function getPageTranslations(locale: string): PageTranslations {
    return T[locale] ?? T.en;
}
