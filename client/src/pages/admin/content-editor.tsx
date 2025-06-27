import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { isUnauthorizedError } from "@/lib/authUtils";
import AdminSidebar from "@/components/admin/sidebar";
import ContentForm from "@/components/admin/content-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import type { ContentSection, ContactSubmission } from "@shared/schema";

export default function ContentEditor() {
  const { toast } = useToast();
  const { isAuthenticated, isLoading } = useAuth();
  const queryClient = useQueryClient();
  const [editingSection, setEditingSection] = useState<ContentSection | null>(null);

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

  const { data: sections = [] } = useQuery<ContentSection[]>({
    queryKey: ["/api/admin/content/sections"],
    enabled: isAuthenticated,
  });

  const { data: submissions = [] } = useQuery<ContactSubmission[]>({
    queryKey: ["/api/admin/contact"],
    enabled: isAuthenticated,
  });

  const deleteSection = useMutation({
    mutationFn: async (id: number) => {
      return await apiRequest("DELETE", `/api/admin/content/sections/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/content/sections"] });
      toast({
        title: "섹션이 삭제되었습니다",
        description: "콘텐츠 섹션이 성공적으로 삭제되었습니다.",
      });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
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
      console.error("Delete section error:", error);
      toast({
        title: "삭제 실패",
        description: "섹션 삭제 중 오류가 발생했습니다.",
        variant: "destructive",
      });
    },
  });

  const markAsRead = useMutation({
    mutationFn: async (id: number) => {
      return await apiRequest("PUT", `/api/admin/contact/${id}/read`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/contact"] });
      toast({
        title: "확인 완료",
        description: "문의를 확인 완료로 표시했습니다.",
      });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
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
      console.error("Mark as read error:", error);
      toast({
        title: "처리 실패",
        description: "문의 상태 변경 중 오류가 발생했습니다.",
        variant: "destructive",
      });
    },
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

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar />
      
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-black text-gray-900 mb-2">콘텐츠 관리</h1>
            <p className="text-gray-600">웹사이트 콘텐츠와 문의를 관리합니다</p>
          </div>

          <Tabs defaultValue="content" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="content">콘텐츠 섹션</TabsTrigger>
              <TabsTrigger value="inquiries">문의 관리</TabsTrigger>
            </TabsList>

            <TabsContent value="content" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">콘텐츠 섹션</h2>
                <Button onClick={() => setEditingSection({} as ContentSection)}>
                  새 섹션 추가
                </Button>
              </div>

              <div className="grid gap-6">
                {sections.map((section) => (
                  <Card key={section.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="flex items-center gap-2">
                            {section.title || section.sectionKey}
                            {!section.isActive && (
                              <Badge variant="secondary">비활성</Badge>
                            )}
                          </CardTitle>
                          <CardDescription>
                            섹션 키: {section.sectionKey}
                          </CardDescription>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setEditingSection(section)}
                          >
                            편집
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                삭제
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>섹션을 삭제하시겠습니까?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  이 작업은 되돌릴 수 없습니다. 섹션이 영구적으로 삭제됩니다.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>취소</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => deleteSection.mutate(section.id)}
                                  disabled={deleteSection.isPending}
                                >
                                  삭제
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {section.subtitle && (
                          <p className="text-sm text-gray-600">{section.subtitle}</p>
                        )}
                        {section.content && (
                          <p className="text-sm line-clamp-3">{section.content}</p>
                        )}
                        <p className="text-xs text-gray-500">
                          마지막 수정: {new Date(section.updatedAt).toLocaleDateString('ko-KR')}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {editingSection && (
                <ContentForm
                  section={editingSection}
                  onClose={() => setEditingSection(null)}
                />
              )}
            </TabsContent>

            <TabsContent value="inquiries" className="space-y-6">
              <h2 className="text-xl font-bold">문의 관리</h2>
              
              <div className="grid gap-4">
                {submissions.map((submission) => (
                  <Card key={submission.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="flex items-center gap-2">
                            {submission.companyName}
                            {!submission.isRead && (
                              <Badge variant="destructive">미확인</Badge>
                            )}
                          </CardTitle>
                          <CardDescription>
                            {submission.contactName} ({submission.email})
                          </CardDescription>
                        </div>
                        <div className="flex gap-2">
                          {!submission.isRead && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => markAsRead.mutate(submission.id)}
                              disabled={markAsRead.isPending}
                            >
                              확인 완료
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">프로젝트 내용:</h4>
                          <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
                            {submission.projectContent}
                          </p>
                        </div>
                        <p className="text-xs text-gray-500">
                          접수일: {new Date(submission.createdAt).toLocaleString('ko-KR')}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {submissions.length === 0 && (
                  <Card>
                    <CardContent className="py-8 text-center">
                      <p className="text-gray-500">접수된 문의가 없습니다.</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
