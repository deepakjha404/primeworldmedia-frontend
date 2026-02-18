/**
 * 🔥 ULTIMATE SEO Configurations for The Global Magazines
 * Complete SEO setup for ALL pages with Enhanced Google Sitelinks Support
 * Optimized for #1 Google Rankings with Rich Snippets
 */

import { SeoProps } from "@/components/seo";

// Base URL for the site
const BASE_URL = "https://primeworldmedia.com";
const SITE_NAME = "Prime World Media";

// ============================================================================
// 🏠 HOME PAGE SEO - ENHANCED FOR GOOGLE SITELINKS & RICH SNIPPETS
// ============================================================================
export const homePageSeo: SeoProps = {
  title: "Home",
  description:
    "The Global Magazines showcases stories of visionary leaders and entrepreneurs, sharing their successes, challenges, and insights to inspire the global enterprise community.",
  url: BASE_URL,
  type: "website",
  keywords:
    "business magazine, leadership insights, entrepreneur stories, business news, enterprise community, visionary leaders, CEO interviews, executive profiles, business articles, success stories, startup stories, business innovation, corporate leadership, business strategy, digital magazine, business publication, thought leadership, industry analysis, business trends, executive magazine, corporate magazine, entrepreneur magazine, business quarterly, trade publications, business transformation, management insights, business excellence, professional development, career insights, business growth, business networking, industry leaders, business case studies, founder stories, business journalism, market insights, business intelligence, CEO profiles, business podcast, business media, online magazine, business analysis, corporate news, business culture, leadership development, entrepreneurial mindset, business opportunities, business solutions, corporate strategy, business empowerment, business inspiration, motivational stories, business achievements, industry disruption, business resilience, business adaptation, business collaboration, team leadership, organizational development, business communication, brand building, marketing strategies, business visibility, business influencers, media network, content creation, storytelling, business narratives, success principles, business wisdom, executive coaching, leadership training, business education, professional resources, business community, networking opportunities, business connections, industry events, business awards, recognition programs, business excellence awards",
  image: `${BASE_URL}/default-preview.jpg`,
  noindex: false,
};

// ============================================================================
// 📚 MAGAZINES SECTION - OPTIMIZED FOR SITELINKS
// ============================================================================
export const magazinesSeo: SeoProps = {
  title: "Business Magazines & Digital Publications | The Global Magazines",
  description:
    "Explore our collection of digital business magazines featuring in-depth interviews, industry analysis, and exclusive insights from global business leaders and entrepreneurs. Read quarterly issues, special editions, and premium content covering leadership, innovation, technology, finance, and entrepreneurship.",
  url: `${BASE_URL}/magazines`,
  type: "website",
  keywords:
    "business magazine, digital magazine, business publication, entrepreneur magazine, leadership magazine, industry insights, business quarterly, executive magazine, corporate magazine, trade publications, online business magazine, digital business publication, business magazine subscription, quarterly business magazine, business journal, professional magazine, management magazine, enterprise magazine, business periodical, industry magazine, sector magazine, business review, business digest, business weekly, business monthly, business e-magazine, PDF magazine, flipbook magazine, interactive magazine, multimedia magazine, business media, corporate publications",
  image: `${BASE_URL}/magazines-preview.jpg`,
  noindex: false,
  section: "Magazines",
};

// Individual Magazine SEO (Template)
export const createMagazineSeo = (
  magazineTitle: string,
  issue: string,
  description: string,
  publishedDate: string,
  imageUrl: string,
  slug: string,
): SeoProps => ({
  title: `${magazineTitle} - ${issue} | Digital Business Magazine`,
  description:
    description ||
    `Read the ${issue} issue of ${magazineTitle}. Featuring exclusive interviews, industry insights, and success stories from visionary business leaders. Download or read online now.`,
  url: `${BASE_URL}/magazine/${slug}`,
  type: "website",
  keywords: `${magazineTitle}, business magazine, ${issue}, business publication, leadership insights, entrepreneur interviews, industry analysis, business trends, digital magazine, PDF magazine, business quarterly, executive profiles, CEO interviews, corporate news, business stories, management insights, business strategies, innovation stories, technology trends, financial analysis, market insights, business culture, leadership lessons, entrepreneurship guide, startup stories, business transformation, professional development`,
  image: imageUrl,
  publishedDate: publishedDate,
  modifiedDate: publishedDate,
  noindex: false,
  section: "Magazines",
});

// ============================================================================
// 📖 STORIES SECTION - ENHANCED FOR GOOGLE DISCOVERY
// ============================================================================
export const storiesSeo: SeoProps = {
  title:
    "Business Success Stories & Entrepreneur Journeys | Inspiring Case Studies",
  description:
    "Discover inspiring success stories from entrepreneurs and business leaders who have overcome challenges, built successful companies, and transformed industries. Read real-life case studies, startup journeys, founder stories, and lessons learned from building multi-million dollar businesses. Get inspired by tales of perseverance, innovation, and business excellence.",
  url: `${BASE_URL}/stories`,
  type: "website",
  keywords:
    "business success stories, entrepreneur stories, startup success, business case studies, founder stories, entrepreneurship journey, business inspiration, success case studies, company growth stories, business transformation, startup journey, founder journey, entrepreneur success, business turnaround stories, rags to riches stories, business failure to success, comeback stories, business innovation stories, disruptive business stories, startup success stories, unicorn startup stories, bootstrapped success, venture capital success, IPO stories, acquisition stories, merger stories, business expansion stories, international business success, small business success, family business success, woman entrepreneur stories, young entrepreneur stories, social entrepreneur stories, tech startup stories, e-commerce success stories, SaaS success stories, retail success stories, manufacturing success stories, service business success, franchise success stories, business mentorship stories, leadership journey stories, CEO success stories, executive stories, business legacy stories",
  image: `${BASE_URL}/stories-preview.jpg`,
  noindex: false,
  section: "Stories",
};

// Individual Story SEO (Template) - ENHANCED
export const createStorySeo = (
  storyTitle: string,
  description: string,
  author: string,
  publishedDate: string,
  modifiedDate: string,
  imageUrl: string,
  slug: string,
  category?: string,
  tags?: string[],
  readingTime?: string,
): SeoProps => ({
  title: `${storyTitle} | Business Success Story`,
  description:
    description ||
    `Read the inspiring story of ${storyTitle}. Discover the journey, challenges overcome, strategies implemented, and valuable lessons learned from successful entrepreneurs and business leaders. Learn how they built their business from scratch, scaled operations, and achieved remarkable success.`,
  url: `${BASE_URL}/stories/${slug}`,
  type: "article",
  author: author,
  publishedDate: publishedDate,
  modifiedDate: modifiedDate || publishedDate,
  keywords: `${storyTitle}, business story, entrepreneur story, success story, ${category || "business leadership"}, business case study, founder journey, startup story, business transformation, entrepreneurship journey, business success, company growth, business strategy, leadership lessons, business insights, entrepreneur interview, founder interview, business breakthrough, scaling business, business challenges, overcoming obstacles, business innovation, disruptive business, industry transformation, business excellence, entrepreneurial success, startup lessons, business mentorship, business inspiration, motivational business story`,
  image: imageUrl,
  article: true,
  noindex: false,
  category: category || "Business Stories",
  tags: tags || ["entrepreneurship", "business success", "leadership"],
  readingTime: readingTime,
  section: "Stories",
});

// ============================================================================
// 📰 ARTICLES SECTION - OPTIMIZED FOR FEATURED SNIPPETS
// ============================================================================
export const articlesSeo: SeoProps = {
  title:
    "Business Articles & Leadership Insights | Expert Analysis & Strategies",
  description:
    "Read expert business articles covering leadership strategies, industry trends, management best practices, and entrepreneurship insights from seasoned executives and thought leaders. Access in-depth analysis, how-to guides, industry reports, market research, and actionable advice for growing your business. Stay updated with the latest business news, strategies, and innovations.",
  url: `${BASE_URL}/articles`,
  type: "website",
  keywords:
    "business articles, leadership articles, management insights, business strategy, industry trends, executive insights, business analysis, thought leadership, business best practices, entrepreneurship articles, business advice, business tips, business guides, how-to business, business tutorials, business education, management articles, corporate strategy articles, leadership development articles, business growth articles, marketing articles, sales articles, finance articles, technology articles, innovation articles, startup articles, small business articles, enterprise articles, business opinion, business commentary, business editorial, business thought pieces, business white papers, business research, industry reports, market analysis, business forecasts, business predictions, trend analysis, competitive analysis, SWOT analysis, business case studies, success strategies, business tactics, business techniques, business frameworks, business models, business planning, strategic planning, business execution",
  image: `${BASE_URL}/articles-preview.jpg`,
  noindex: false,
  section: "Articles",
};

// Individual Article SEO (Template) - ENHANCED
export const createArticleSeo = (
  articleTitle: string,
  description: string,
  author: string,
  publishedDate: string,
  modifiedDate: string,
  imageUrl: string,
  slug: string,
  category?: string,
  tags?: string[],
  readingTime?: string,
): SeoProps => ({
  title: `${articleTitle} | Business Article`,
  description:
    description ||
    `${articleTitle} - Expert insights, practical strategies, and actionable advice on business leadership, strategy, and industry trends from ${SITE_NAME}. Learn proven techniques, best practices, and innovative approaches to growing your business and improving leadership effectiveness.`,
  url: `${BASE_URL}/article/${slug}`,
  type: "article",
  author: author,
  publishedDate: publishedDate,
  modifiedDate: modifiedDate || publishedDate,
  keywords: `${articleTitle}, business article, ${category || "business insights"}, leadership strategy, business analysis, industry trends, executive insights, management best practices, business advice, business tips, how-to business, business guide, business tactics, business strategies, business solutions, professional development, business growth strategies, leadership development, entrepreneurship advice, startup advice, business innovation, business excellence, business success tips, business improvement, business optimization, business transformation strategies`,
  image: imageUrl,
  article: true,
  noindex: false,
  category: category || "Business Articles",
  tags: tags || ["business", "leadership", "strategy"],
  readingTime: readingTime,
  section: "Articles",
});

// ============================================================================
// ℹ️ ABOUT PAGE - ENHANCED FOR BRAND AUTHORITY
// ============================================================================
export const createNewsSeo = (
  newsTitle: string,
  description: string,
  author: string,
  publishedDate: string,
  modifiedDate: string,
  imageUrl: string,
  slug: string,
  category?: string,
  tags?: string[],
  readingTime?: string,
): SeoProps => ({
  title: `${newsTitle} | Business News`,
  description:
    description ||
    `${newsTitle} - Latest business news, analysis, and insights from ${SITE_NAME}.`,
  url: `${BASE_URL}/news/${slug}`,
  type: "article",
  author: author,
  publishedDate: publishedDate,
  modifiedDate: modifiedDate || publishedDate,
  keywords: `${newsTitle}, business news, ${category || "industry updates"}, market updates, leadership news, corporate news`,
  image: imageUrl,
  article: true,
  noindex: false,
  category: category || "Business News",
  tags: tags || ["news", "business", "updates"],
  readingTime: readingTime,
  section: "News",
});

export const aboutPageSeo: SeoProps = {
  title: "About Us - Our Mission, Vision & Team | The Global Magazines",
  description: `Learn about ${SITE_NAME}'s mission to showcase visionary leaders and entrepreneurs, sharing their successes, challenges, and insights to inspire the global enterprise community. Discover our story, values, editorial team, and commitment to delivering high-quality business journalism. Founded by industry experts, we provide authentic, inspiring content that empowers business leaders worldwide.`,
  url: `${BASE_URL}/about`,
  type: "website",
  keywords:
    "about the global magazines, business media platform, our mission, our vision, business magazine about, leadership media, entrepreneur platform, business publication mission, about us, company background, our story, our team, editorial team, our values, our purpose, media company, publishing company, business journalism, business media ethics, editorial standards, content quality, journalistic integrity, business magazine history, founding story, company profile, organization overview, business media mission statement, publishing philosophy, content strategy, audience focus, community impact, business education mission, leadership development mission, entrepreneurship support, business community building, media innovation, digital publishing, multimedia platform",
  image: `${BASE_URL}/about-preview.jpg`,
  noindex: false,
};

// ============================================================================
// 📞 WORK WITH US PAGE - ENHANCED FOR CONVERSIONS
// ============================================================================
export const contactPageSeo: SeoProps = {
  title:
    "Work with Us - Contact The Global Magazines | Partnership & Advertising",
  description: `Get in touch with ${SITE_NAME} for partnership opportunities, editorial submissions, advertising inquiries, sponsorship packages, or to share your business story with our global audience. We welcome collaborations with businesses, entrepreneurs, PR agencies, and content creators. Contact us for media kits, advertising rates, contributor guidelines, interview requests, press releases, and business inquiries. Reach millions of business leaders and decision-makers worldwide.`,
  url: `${BASE_URL}/contact`,
  type: "website",
  keywords:
    "contact the global magazines, work with us, partnership opportunities, advertise with us, submit story, media inquiries, editorial submissions, business magazine contact, contact us, get in touch, reach us, write for us, contribute, submit article, pitch story, advertising inquiries, sponsorship opportunities, brand partnerships, media partnerships, collaboration opportunities, guest post, contributor program, freelance opportunities, press inquiries, media kit, advertising rates, rate card, audience demographics, circulation numbers, readership statistics, business development contact, sales contact, editorial contact, partnerships contact, PR contact, marketing contact, advertising department, editorial department, business inquiries, commercial inquiries, strategic partnerships, content partnerships, distribution partnerships",
  image: `${BASE_URL}/contact-preview.jpg`,
  noindex: false,
};

// ============================================================================
// 📜 LEGAL PAGES - COMPREHENSIVE
// ============================================================================
export const termsOfUseSeo: SeoProps = {
  title: "Terms of Use - Legal Terms & Conditions | The Global Magazines",
  description: `Read ${SITE_NAME}'s Terms of Use governing the access and use of our website, content, and services. Understand your rights and responsibilities when using our platform, including content usage, intellectual property rights, user conduct, disclaimers, and limitations of liability. Last updated: 2025. By accessing our website, you agree to these terms.`,
  url: `${BASE_URL}/terms-of-use`,
  type: "website",
  keywords:
    "terms of use, terms and conditions, website terms, user agreement, legal terms, terms of service, usage terms, website rules, acceptable use policy, user terms, website legal terms, terms and policies, service terms, access terms, content usage terms, intellectual property terms, copyright terms, trademark terms, user responsibilities, prohibited activities, account terms, subscription terms, membership terms, service conditions, platform terms, digital terms, online terms",
  noindex: true,
};

export const privacyPolicySeo: SeoProps = {
  title:
    "Privacy Policy - Data Protection & Privacy Practices | The Global Magazines",
  description: `${SITE_NAME}'s Privacy Policy outlines how we collect, use, protect, and manage your personal information when you use our website and services. Learn about our data collection practices, cookie usage, information security, third-party sharing, user rights under GDPR and CCPA, and how to control your privacy settings. We are committed to protecting your personal data and respecting your privacy. Last updated: 2025.`,
  url: `${BASE_URL}/privacy-policy`,
  type: "website",
  keywords:
    "privacy policy, data protection, personal information, privacy practices, data security, privacy notice, data privacy, information privacy, privacy statement, GDPR compliance, CCPA compliance, data collection, personal data, user privacy, privacy rights, data usage, cookie policy, tracking policy, analytics privacy, third-party privacy, data sharing, data retention, privacy controls, privacy settings, data access rights, data deletion rights, privacy preferences, consent management, privacy compliance, information security, data safeguards",
  noindex: true,
};

export const disclaimerSeo: SeoProps = {
  title:
    "Disclaimer - Legal Disclaimer & Liability Information | The Global Magazines",
  description: `Read ${SITE_NAME}'s comprehensive disclaimer regarding the information, content, advice, and services provided on our website. Understand the limitations of liability, accuracy of information, external links policy, professional advice disclaimers, and general legal notices. Content is provided for informational purposes only. Last updated: 2025.`,
  url: `${BASE_URL}/disclaimer`,
  type: "website",
  keywords:
    "disclaimer, legal disclaimer, content disclaimer, liability disclaimer, website disclaimer, information disclaimer, advice disclaimer, accuracy disclaimer, professional disclaimer, general disclaimer, liability limitation, content accuracy, information accuracy, external links disclaimer, third-party disclaimer, affiliate disclaimer, advertising disclaimer, opinion disclaimer, editorial disclaimer, responsibility disclaimer, warranty disclaimer, guarantee disclaimer, legal notice, limitation of liability, disclaimer of warranties, no responsibility disclaimer",
  noindex: true,
};

// ============================================================================
// 📂 CATEGORY PAGES (Dynamic) - ENHANCED FOR TOPICAL AUTHORITY
// ============================================================================
export const createCategorySeo = (
  categoryName: string,
  categoryDescription: string,
  slug: string,
): SeoProps => ({
  title: `${categoryName} Articles & Stories | Expert Insights on ${categoryName}`,
  description:
    categoryDescription ||
    `Explore our comprehensive collection of ${categoryName.toLowerCase()} articles, stories, case studies, and expert insights. Discover the latest ${categoryName.toLowerCase()} trends, strategies, best practices, and success stories from industry leaders, executives, and entrepreneurs. Stay informed with in-depth analysis, practical advice, and actionable tips on ${categoryName.toLowerCase()}.`,
  url: `${BASE_URL}/category/${slug}`,
  type: "website",
  keywords: `${categoryName}, ${categoryName} articles, ${categoryName} stories, business ${categoryName.toLowerCase()}, ${categoryName} insights, ${categoryName} news, ${categoryName} trends, ${categoryName} strategies, ${categoryName} best practices, ${categoryName} tips, ${categoryName} advice, ${categoryName} guide, ${categoryName} resources, ${categoryName} case studies, ${categoryName} analysis, ${categoryName} expertise, ${categoryName} thought leadership, ${categoryName} innovation, ${categoryName} development, ${categoryName} growth, ${categoryName} success, ${categoryName} excellence, ${categoryName} leadership, ${categoryName} management`,
  image: `${BASE_URL}/category-${slug}-preview.jpg`,
  noindex: false,
  category: categoryName,
});

// ============================================================================
// 🏷️ TAG PAGES (Dynamic) - OPTIMIZED FOR LONG-TAIL KEYWORDS
// ============================================================================
export const createTagSeo = (tagName: string, slug: string): SeoProps => ({
  title: `${tagName} - Related Articles, Stories & Insights | The Global Magazines`,
  description: `Discover all content tagged with ${tagName}. Explore comprehensive articles, inspiring stories, expert analysis, and practical perspectives on ${tagName.toLowerCase()} from business leaders, industry experts, and successful entrepreneurs. Find valuable insights, strategies, tips, and best practices related to ${tagName.toLowerCase()}. Updated regularly with fresh content.`,
  url: `${BASE_URL}/tag/${slug}`,
  type: "website",
  keywords: `${tagName}, ${tagName} content, ${tagName} articles, business ${tagName.toLowerCase()}, ${tagName} insights, ${tagName} stories, ${tagName} tips, ${tagName} strategies, ${tagName} advice, ${tagName} resources, ${tagName} news, ${tagName} trends, ${tagName} best practices, ${tagName} case studies, ${tagName} examples, ${tagName} guide, ${tagName} information, ${tagName} knowledge, ${tagName} expertise, ${tagName} thought leadership`,
  image: `${BASE_URL}/default-preview.jpg`,
  noindex: false,
  tags: [tagName],
});

// ============================================================================
// ✍️ AUTHOR PAGES (Dynamic) - ENHANCED FOR AUTHOR AUTHORITY
// ============================================================================
export const createAuthorSeo = (
  authorName: string,
  authorBio: string,
  slug: string,
  authorImage?: string,
): SeoProps => ({
  title: `${authorName} - Author Profile & Articles | The Global Magazines`,
  description:
    authorBio ||
    `Read articles, stories, and expert insights by ${authorName}, a contributor to ${SITE_NAME}. Discover their unique perspective on business, leadership, entrepreneurship, and industry trends. Explore their published work, professional background, areas of expertise, and latest contributions. Follow ${authorName} for regular updates on business strategies, market analysis, and leadership insights.`,
  url: `${BASE_URL}/authors/${slug}`,
  type: "profile",
  author: authorName,
  keywords: `${authorName}, author profile, ${authorName} articles, business writer, contributor, journalist, ${authorName} stories, author page, writer profile, ${authorName} bio, ${authorName} biography, ${authorName} background, ${authorName} expertise, ${authorName} publications, ${authorName} writing, ${authorName} insights, ${authorName} perspective, ${authorName} analysis, ${authorName} opinion, ${authorName} commentary, ${authorName} content, contributing author, guest author, staff writer, senior writer, editor, business journalist, industry expert, thought leader, subject matter expert`,
  image: authorImage || `${BASE_URL}/default-author.jpg`,
  noindex: false,
});

// ============================================================================
// 🔍 SEARCH RESULTS PAGE
// ============================================================================
export const searchPageSeo: SeoProps = {
  title:
    "Search Results - Find Business Articles & Stories | The Global Magazines",
  description: `Search ${SITE_NAME} for business articles, success stories, leadership insights, entrepreneur interviews, industry analysis, and expert advice. Find relevant content across our entire library of magazines, stories, articles, and resources. Use filters to narrow results by category, date, author, or topic.`,
  url: `${BASE_URL}/search`,
  type: "website",
  keywords:
    "search, find articles, search stories, business content search, article search, story search, content search, site search, search results, find content, discover articles, browse content, explore stories, search business magazine, search leadership articles, search entrepreneur stories",
  noindex: true,
};

// ============================================================================
// ❌ 404 ERROR PAGE
// ============================================================================
export const notFoundPageSeo: SeoProps = {
  title: "Page Not Found - 404 Error | The Global Magazines",
  description:
    "The page you're looking for could not be found. It may have been moved, deleted, or the URL might be incorrect. Explore our business articles, success stories, leadership insights, and digital magazines. Use our search feature or browse categories to find what you're looking for.",
  url: `${BASE_URL}/404`,
  type: "website",
  keywords:
    "404 error, page not found, missing page, broken link, error page, not found, 404 page",
  noindex: true,
};

// ============================================================================
// 📧 NEWSLETTER SIGNUP PAGE - ENHANCED FOR CONVERSIONS
// ============================================================================
export const newsletterPageSeo: SeoProps = {
  title:
    "Subscribe to Our Newsletter - Get Weekly Business Insights | The Global Magazines",
  description: `Get the week's best business stories, leadership insights, entrepreneur interviews, and industry analysis delivered straight to your inbox. Subscribe to ${SITE_NAME}'s free newsletter and join thousands of business leaders, executives, and entrepreneurs who stay informed with our curated content. Receive exclusive articles, success stories, expert tips, and early access to new magazine issues. No spam, unsubscribe anytime.`,
  url: `${BASE_URL}/newsletter`,
  type: "website",
  keywords:
    "newsletter, business newsletter, subscribe, email updates, weekly digest, business insights newsletter, leadership newsletter, entrepreneur newsletter, free newsletter, email subscription, newsletter signup, mailing list, email list, business email newsletter, weekly business newsletter, business updates, industry newsletter, executive newsletter, management newsletter, corporate newsletter, professional newsletter, digital newsletter, business news digest, curated content, exclusive content, newsletter subscription, subscribe to newsletter, join newsletter, email digest, business briefing, weekly roundup, content updates",
  image: `${BASE_URL}/newsletter-preview.jpg`,
  noindex: false,
};

// ============================================================================
// 📊 ADVERTISE WITH US PAGE - NEW
// ============================================================================
export const advertisePageSeo: SeoProps = {
  title:
    "Advertise With Us - Reach Millions of Business Leaders | The Global Magazines",
  description: `Advertise your business, products, or services on ${SITE_NAME} and reach millions of business leaders, executives, entrepreneurs, and decision-makers worldwide. We offer display advertising, sponsored content, native advertising, newsletter sponsorships, and custom marketing solutions. Download our media kit to learn about our audience demographics, advertising packages, rates, and ROI opportunities. Partner with us to build brand awareness, generate leads, and drive business growth.`,
  url: `${BASE_URL}/advertise`,
  type: "website",
  keywords:
    "advertise with us, advertising opportunities, business advertising, display ads, sponsored content, native advertising, brand partnerships, media kit, advertising rates, ad packages, advertising solutions, marketing solutions, reach business audience, B2B advertising, executive audience, business decision makers, advertising platform, online advertising, digital advertising, magazine advertising, content marketing, sponsored articles, brand visibility, lead generation advertising, performance marketing, advertising ROI, advertising metrics",
  image: `${BASE_URL}/advertise-preview.jpg`,
  noindex: false,
};

// ============================================================================
// ✍️ WRITE FOR US PAGE - NEW
// ============================================================================
export const writeForUsPageSeo: SeoProps = {
  title:
    "Write For Us - Contribute Articles & Share Your Expertise | The Global Magazines",
  description: `Share your business expertise, insights, and stories with ${SITE_NAME}'s global audience. We welcome guest contributions from business leaders, entrepreneurs, industry experts, consultants, and thought leaders. Learn about our contributor guidelines, editorial standards, submission process, and topics we cover. Build your personal brand, establish thought leadership, and reach millions of readers worldwide. Submit your article pitch today.`,
  url: `${BASE_URL}/write-for-us`,
  type: "website",
  keywords:
    "write for us, guest post, contribute, submit article, contributor guidelines, guest author, freelance writing, business writing opportunities, guest posting, article submission, contribute content, become a contributor, write article, submit story, pitch article, guest writer, contributing writer, author opportunities, thought leadership platform, publish article, share expertise, expert contributor, industry expert, subject matter expert, business blog, guest blogging, content submission, editorial guidelines, submission guidelines",
  image: `${BASE_URL}/write-for-us-preview.jpg`,
  noindex: false,
};

// ============================================================================
// 📰 PRESS & MEDIA PAGE - NEW
// ============================================================================
export const pressPageSeo: SeoProps = {
  title:
    "Press & Media - News, Press Releases & Media Resources | The Global Magazines",
  description: `Access ${SITE_NAME}'s press releases, company news, media resources, and press contact information. Download high-resolution logos, brand assets, and media kits. Read our latest announcements, milestones, partnerships, and company updates. Journalists and media professionals can request interviews, company information, and expert commentary. Stay updated with our latest news and developments.`,
  url: `${BASE_URL}/press`,
  type: "website",
  keywords:
    "press, media, press releases, company news, media resources, media kit, press kit, brand assets, logos, company announcements, news releases, press contact, media contact, media inquiries, press inquiries, journalist resources, media coverage, company updates, press room, newsroom, media center, press information, company information, media relations, public relations, PR, brand guidelines, media assets, press photos, company milestones, latest news",
  image: `${BASE_URL}/press-preview.jpg`,
  noindex: false,
};

// ============================================================================
// 🎯 CATEGORY-SPECIFIC PRESETS - FULLY ENHANCED
// ============================================================================

export const leadershipCategorySeo = createCategorySeo(
  "Leadership",
  "Explore comprehensive leadership articles and inspiring stories featuring proven strategies, actionable insights, and valuable lessons from top executives, CEOs, and business leaders worldwide. Learn about different leadership styles, team management, decision-making, emotional intelligence, change management, and executive presence. Discover how successful leaders motivate teams, drive innovation, and build high-performing organizations.",
  "leadership",
);

export const innovationCategorySeo = createCategorySeo(
  "Innovation",
  "Discover how innovative companies, disruptive startups, and visionary entrepreneurs are transforming industries, creating new markets, solving complex problems, and driving business growth through creativity and technology. Explore innovation strategies, design thinking, R&D best practices, product development, digital transformation, and breakthrough business models. Learn from companies at the forefront of innovation.",
  "innovation",
);

export const technologyCategorySeo = createCategorySeo(
  "Technology",
  "Read about the latest technology trends, digital transformation strategies, AI and machine learning, cloud computing, cybersecurity, blockchain, IoT, and how tech leaders are shaping the future of business. Discover how companies leverage technology for competitive advantage, operational efficiency, and customer experience. Stay updated with emerging technologies and their business applications.",
  "technology",
);

export const financeCategorySeo = createCategorySeo(
  "Finance",
  "Access expert insights on financial strategy, investment trends, corporate finance, funding options, financial planning, risk management, economic analysis, and wealth management from CFOs, financial advisors, and industry leaders. Learn about capital raising, M&A strategies, financial modeling, budgeting, forecasting, and financial decision-making for business growth and profitability.",
  "finance",
);

export const marketingCategorySeo = createCategorySeo(
  "Marketing",
  "Learn from successful marketing campaigns, brand strategies, digital marketing innovations, content marketing, social media strategies, SEO tactics, customer acquisition, and brand positioning from leading companies, CMOs, and marketing experts. Discover data-driven marketing, marketing automation, customer journey optimization, and ROI-focused marketing approaches that drive business results.",
  "marketing",
);

export const entrepreneurshipCategorySeo = createCategorySeo(
  "Entrepreneurship",
  "Follow the journeys of successful entrepreneurs from startup launch to scale, learning valuable lessons, strategies, challenges overcome, and practical advice along the way. Discover funding strategies, business model development, product-market fit, customer acquisition, team building, and growth hacking. Get inspired by stories of bootstrapped startups, venture-backed unicorns, and serial entrepreneurs who built remarkable companies.",
  "entrepreneurship",
);

export const sustainabilityCategorySeo = createCategorySeo(
  "Sustainability",
  "Explore how businesses are integrating sustainability, environmental responsibility, and social impact into their operations, creating positive change while driving growth and profitability. Learn about ESG strategies, circular economy, renewable energy, sustainable supply chains, corporate social responsibility, and how purpose-driven companies are building profitable businesses that benefit people and the planet.",
  "sustainability",
);

export const managementCategorySeo = createCategorySeo(
  "Management",
  "Access comprehensive management insights covering organizational development, team management, performance management, change management, strategic planning, operational excellence, and people management. Learn proven management techniques, frameworks, and best practices from experienced managers, executives, and organizational development experts to build efficient, productive, and engaged teams.",
  "management",
);

export const startupCategorySeo = createCategorySeo(
  "Startup",
  "Dive deep into the startup ecosystem with articles covering startup funding, product development, MVP creation, early-stage growth, customer validation, pivot strategies, team building, and scaling operations. Learn from startup founders, venture capitalists, and accelerator experts about building successful startups from idea to exit. Understand common startup mistakes and how to avoid them.",
  "startup",
);

export const salesCategorySeo = createCategorySeo(
  "Sales",
  "Master sales strategies, techniques, and best practices with insights on B2B sales, B2C sales, consultative selling, solution selling, sales management, pipeline development, closing deals, customer relationships, sales enablement, and revenue growth. Learn from top sales leaders, sales trainers, and successful sales professionals about building high-performing sales teams and consistent revenue generation.",
  "sales",
);

// Export all configurations
export const seoConfigurations = {
  // Main pages
  home: homePageSeo,
  magazines: magazinesSeo,
  stories: storiesSeo,
  articles: articlesSeo,
  about: aboutPageSeo,
  contact: contactPageSeo,
  termsOfUse: termsOfUseSeo,
  privacyPolicy: privacyPolicySeo,
  disclaimer: disclaimerSeo,

  // Utility pages
  search: searchPageSeo,
  notFound: notFoundPageSeo,
  newsletter: newsletterPageSeo,

  // 🆕 New pages
  advertise: advertisePageSeo,
  writeForUs: writeForUsPageSeo,
  press: pressPageSeo,

  // Category presets
  categories: {
    leadership: leadershipCategorySeo,
    innovation: innovationCategorySeo,
    technology: technologyCategorySeo,
    finance: financeCategorySeo,
    marketing: marketingCategorySeo,
    entrepreneurship: entrepreneurshipCategorySeo,
    sustainability: sustainabilityCategorySeo,
    management: managementCategorySeo,
    startup: startupCategorySeo,
    sales: salesCategorySeo,
  },

  // Factory functions for dynamic pages
  createMagazineSeo,
  createStorySeo,
  createArticleSeo,
  createNewsSeo,
  createCategorySeo,
  createTagSeo,
  createAuthorSeo,
};

export default seoConfigurations;
