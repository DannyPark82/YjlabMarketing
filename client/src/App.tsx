import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/useAuth";
import Home from "@/pages/home";
import AdminDashboard from "@/pages/admin/dashboard";
import ContentEditor from "@/pages/admin/content-editor";
import MediaManager from "@/pages/admin/media-manager";
import NotFound from "@/pages/not-found";

function Router() {
  const { isAuthenticated, isLoading } = useAuth();

  return (
    <Switch>
      {/* Public routes */}
      <Route path="/" component={Home} />
      
      {/* Admin routes - protected */}
      {!isLoading && isAuthenticated && (
        <>
          <Route path="/admin" component={AdminDashboard} />
          <Route path="/admin/content" component={ContentEditor} />
          <Route path="/admin/media" component={MediaManager} />
        </>
      )}
      
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
