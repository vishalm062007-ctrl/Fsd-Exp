import React, { useState } from 'react';
import './Blog.css';

const TECH_NEWS = [
  {
    id: 1,
    title: "Quantum Computing Reaches New Milestone: Qubit Stability Improved by 400%",
    category: "Computing",
    author: "Elena Rostova",
    date: "April 8, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80",
    description: "Researchers at global leading labs have achieved unprecedented coherence times, bringing fault-tolerant quantum supremacy much closer to reality.",
    content: "In a groundbreaking development, researchers have achieved a 400% improvement in qubit stability. This milestone was reached by utilizing a novel error-correction protocol combined with an innovative cryogenic cooling technique. The extended coherence times mean that quantum computers can now perform much longer sequences of operations without losing their delicate state, moving the industry significantly closer to solving problems that are intractable for classical supercomputers. Experts predict that practical commercial applications in materials science and cryptography could begin emerging within the next 3-5 years.",
    featured: true
  },
  {
    id: 2,
    title: "The Next Generation of AI Models Can Now Self-Debug in Real-time",
    category: "Artificial Intelligence",
    author: "David Chen",
    date: "April 7, 2026",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=400&q=80",
    description: "New architectural breakthroughs allow foundational models to critically assess their execution paths, halting and repairing errors dynamically.",
    content: "The latest breakthrough in AI architectures introduces active introspection, allowing models to monitor their own inferencing process. When an anomaly or potential hallucination is detected, the system briefly pauses its output generation to run internal diagnostics against localized fact-check graphs. This real-time self-debugging not only dramatically reduces errors in generated code and factual statements but also allows the AI to provide transparent justifications for its mid-course corrections, fundamentally increasing trust in autonomous systems.",
  },
  {
    id: 3,
    title: "Solid-State Batteries Enter Mass Production for EVs",
    category: "Hardware",
    author: "Samantha Wells",
    date: "April 6, 2026",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=400&q=80",
    description: "Major automotive manufacturers have started rolling out the first fleets featuring 1000-mile range batteries that charge in single-digit minutes.",
    content: "After years of lab testing and delayed promises, full-scale mass production of solid-state batteries has finally begun. Automakers are incorporating these advanced energy dense power cells into their 2027 model lineups. By replacing liquid electrolytes with stable solid materials, the new batteries eliminate fire risks while effectively doubling the range of traditional EVs. Furthermore, charging times have plummeted, with a baseline 10% to 80% charge taking just under 8 minutes on newest ultrafast charging networks.",
  },
  {
    id: 4,
    title: "WebAssembly Edge Runtimes Now Outperform Virtual Machines",
    category: "Software Development",
    author: "Marcus Jantz",
    date: "April 5, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=400&q=80",
    description: "Wasm has transformed the cloud infrastructure landscape, offering near-instant cold starts and unparalleled security constraints.",
    content: "A comprehensive benchmark released today shows that containerized WebAssembly runtimes executing at the compute edge are now demonstrably faster than traditional VMs and microVMs. With cold starts measured in mere microseconds rather than milliseconds, serverless functions can scale perfectly with demand. Beyond raw speed, the capability-based security model inherent to Wasm has enterprises rapidly migrating legacy backends to Wasm modules, heralding a massive shift in how we deploy backend architectures.",
  },
  {
    id: 5,
    title: "AR Glasses Without the Bulk: The New Holographic Breakthrough",
    category: "Wearables",
    author: "Jordan Lee",
    date: "April 4, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&w=400&q=80",
    description: "Forget the clunky headsets of the past. The new standard for augmented reality resembles ordinary prescription lenses.",
    content: "Through advancements in metamaterial lenses and micro-LED displays, researchers have successfully embedded high-resolution holographic projection into a form factor identical to standard thick-rimmed eyewear. Generating a persistent, bright overlay that integrates perfectly with ambient lighting, these glasses mark the true arrival of everyday AR. Paired with localized spatial computing hubs kept in our pockets, the battery life extends throughout a normal 16-hour waking day.",
  }
];

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeArticle, setActiveArticle] = useState(null);
  
  const categories = ["All", "Artificial Intelligence", "Computing", "Hardware", "Software Development", "Wearables"];
  
  const filteredNews = activeCategory === "All" 
    ? TECH_NEWS 
    : TECH_NEWS.filter(news => news.category === activeCategory);

  return (
    <div className="aura-container">
      <header className="aura-header">
        <div className="logo" onClick={() => setActiveArticle(null)}>
          <div className="logo-dot"></div>
          Feed.
        </div>
        {!activeArticle && (
          <nav className="category-pills">
            {categories.map(cat => (
              <button 
                key={cat} 
                className={`pill ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </nav>
        )}
        <div className="header-actions">
           <button className="btn-primary">Subscribe</button>
        </div>
      </header>

      <main className="aura-main">
        {activeArticle ? (
          <article className="article-view">
            <button className="btn-back" onClick={() => setActiveArticle(null)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Back
            </button>
            
            <div className="article-hero">
               <img src={activeArticle.image} alt={activeArticle.title} />
            </div>
            
            <div className="article-content-wrapper">
              <div className="article-meta-sidebar">
                <span className="badge">{activeArticle.category}</span>
                <div className="author-block">
                  <div className="author-avatar">{activeArticle.author.charAt(0)}</div>
                  <div>
                    <div className="author-name">{activeArticle.author}</div>
                    <div className="article-date">{activeArticle.date}</div>
                    <div className="article-time">{activeArticle.readTime}</div>
                  </div>
                </div>
              </div>
              
              <div className="article-text">
                <h1>{activeArticle.title}</h1>
                <p className="lead">{activeArticle.description}</p>
                <div className="body-text">{activeArticle.content}</div>
              </div>
            </div>
          </article>
        ) : (
          <div className="bento-grid">
            {filteredNews.map((post, index) => (
              <div 
                key={post.id} 
                className={`bento-item ${index === 0 && activeCategory === 'All' ? 'featured' : ''}`}
                onClick={() => setActiveArticle(post)}
              >
                <div className="bento-image-container">
                  <img src={post.image} alt={post.title} />
                  <div className="bento-tag">{post.category}</div>
                </div>
                <div className="bento-content">
                  <h3 className="bento-title">{post.title}</h3>
                  <p className="bento-excerpt">{post.description}</p>
                  <div className="bento-footer">
                    <span className="author">{post.author}</span>
                    <span className="read-time">{post.readTime}</span>
                  </div>
                </div>
              </div>
            ))}
            {filteredNews.length === 0 && (
              <div className="empty-state">
                <p>No articles found for "{activeCategory}".</p>
              </div>
            )}
          </div>
        )}
      </main>
      
      <footer className="aura-footer">
        <p>&copy; 2026 Feed Design. The future is bright.</p>
      </footer>
    </div>
  );
}
