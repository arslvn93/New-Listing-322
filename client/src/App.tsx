import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import LandingPage from "@/components/LandingPage";
import OpenHousePage from "@/components/OpenHousePage";
import NotFound from "@/pages/not-found";
import AdminDashboard from "@/components/admin/AdminDashboard";
import { siteMetadata } from "./config/siteConfig";

// Component to handle document head metadata
const DocumentHead = () => {
  // Update document title
  document.title = siteMetadata.title;
  
  // Update or create meta tags
  const updateMetaTag = (name: string, content: string, property = false) => {
    const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
    let meta = document.querySelector(selector) as HTMLMetaElement;
    
    if (!meta) {
      meta = document.createElement('meta');
      if (property) {
        meta.setAttribute('property', name);
      } else {
        meta.setAttribute('name', name);
      }
      document.head.appendChild(meta);
    }
    
    meta.setAttribute('content', content);
  };

  // Update meta description
  updateMetaTag('description', siteMetadata.description);
  
  // Update keywords
  updateMetaTag('keywords', siteMetadata.keywords);
  
  // Update Open Graph tags
  updateMetaTag('og:title', siteMetadata.title, true);
  updateMetaTag('og:description', siteMetadata.description, true);
  updateMetaTag('og:image', siteMetadata.ogImage, true);
  updateMetaTag('og:type', siteMetadata.ogType, true);
  updateMetaTag('og:url', siteMetadata.canonical, true);
  
  // Update Twitter Card tags
  updateMetaTag('twitter:card', siteMetadata.twitterCard);
  updateMetaTag('twitter:title', siteMetadata.title);
  updateMetaTag('twitter:description', siteMetadata.description);
  updateMetaTag('twitter:image', siteMetadata.ogImage);
  
  // Update canonical URL
  let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  canonical.setAttribute('href', siteMetadata.canonical);
  
  return null;
};

function Router() {
  return (
    <Switch>
      <Route path="/" component={LandingPage} />
      <Route path="/openhouse" component={OpenHousePage} />
      <Route path="/admin" component={AdminDashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <DocumentHead />
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
