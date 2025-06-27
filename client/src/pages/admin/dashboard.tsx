import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import AdminSidebar from "@/components/admin/sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { ContactSubmission } from "@shared/schema";

export default function AdminDashboard() {
  const { toast } = useToast();
  const { isAuthenticated, isLoading } = useAuth();

  // Redirect to home if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
      return;
    }
  }, [isAuthenticated, isLoading, toast]);

  const { data: submissions = [] } = useQuery<ContactSubmission[]>({
    queryKey: ["/api/admin/contact"],
    enabled: isAuthenticated,
  });

  const { data: sections = [] } = useQuery({
    queryKey: ["/api/admin/content/sections"],
    enabled: isAuthenticated,
  });

  const { data: mediaFiles = [] } = useQuery({
    queryKey: ["/api/admin/media"],
    enabled: isAuthenticated,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const unreadSubmissions = submissions.filter(s => !s.isRead);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar />
      
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-black text-gray-900 mb-2">관리자 대시보드</h1>
            <p className="text-gray-600">YJLAB 웹사이트 관리</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">총 문의</CardTitle>
                <svg className="h-4 w-4 text-muted-foreground" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{submissions.length}</div>
                <p className="text-xs text-muted-foreground">총 접수된 문의</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">미확인 문의</CardTitle>
                <Badge variant={unreadSubmissions.length > 0 ? "destructive" : "secondary"}>
                  {unreadSubmissions.length}
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{unreadSubmissions.length}</div>
                <p className="text-xs text-muted-foreground">확인이 필요한 문의</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">콘텐츠 섹션</CardTitle>
                <svg className="h-4 w-4 text-muted-foreground" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V4H6z" clipRule="evenodd"/>
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{sections.length}</div>
                <p className="text-xs text-muted-foreground">관리 중인 콘텐츠</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">미디어 파일</CardTitle>
                <svg className="h-4 w-4 text-muted-foreground" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd"/>
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mediaFiles.length}</div>
                <p className="text-xs text-muted-foreground">업로드된 이미지</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>최근 문의</CardTitle>
                <CardDescription>최근 접수된 프로젝트 문의 목록</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {submissions.slice(0, 5).map((submission) => (
                    <div key={submission.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-semibold text-gray-900">{submission.companyName}</p>
                        <p className="text-sm text-gray-600">{submission.contactName}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(submission.createdAt).toLocaleDateString('ko-KR')}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {!submission.isRead && (
                          <Badge variant="destructive" className="text-xs">새글</Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4" asChild>
                  <a href="/admin/content">모든 문의 보기</a>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>빠른 작업</CardTitle>
                <CardDescription>자주 사용하는 관리 기능</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <Button asChild>
                    <a href="/admin/content">콘텐츠 편집</a>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href="/admin/media">미디어 관리</a>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href="/">홈페이지 보기</a>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href="/api/logout">로그아웃</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
