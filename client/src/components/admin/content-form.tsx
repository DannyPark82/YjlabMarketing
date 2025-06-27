import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { isUnauthorizedError } from "@/lib/authUtils";
import { useToast } from "@/hooks/use-toast";
import { insertContentSectionSchema, type ContentSection } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import type { z } from "zod";

interface ContentFormProps {
  section: ContentSection | {};
  onClose: () => void;
}

type ContentFormData = z.infer<typeof insertContentSectionSchema>;

export default function ContentForm({ section, onClose }: ContentFormProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(true);
  
  const isEditing = 'id' in section;
  
  const form = useForm<ContentFormData>({
    resolver: zodResolver(insertContentSectionSchema),
    defaultValues: {
      sectionKey: isEditing ? section.sectionKey : "",
      title: isEditing ? section.title || "" : "",
      subtitle: isEditing ? section.subtitle || "" : "",
      content: isEditing ? section.content || "" : "",
      metadata: isEditing ? section.metadata || {} : {},
      isActive: isEditing ? section.isActive ?? true : true,
    },
  });

  const createSection = useMutation({
    mutationFn: async (data: ContentFormData) => {
      return await apiRequest("POST", "/api/admin/content/sections", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/content/sections"] });
      toast({
        title: "섹션이 생성되었습니다",
        description: "새로운 콘텐츠 섹션이 성공적으로 생성되었습니다.",
      });
      handleClose();
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
      console.error("Create section error:", error);
      toast({
        title: "생성 실패",
        description: "섹션 생성 중 오류가 발생했습니다.",
        variant: "destructive",
      });
    },
  });

  const updateSection = useMutation({
    mutationFn: async (data: ContentFormData) => {
      if (!isEditing) throw new Error("Cannot update without section ID");
      return await apiRequest("PUT", `/api/admin/content/sections/${section.id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/content/sections"] });
      toast({
        title: "섹션이 수정되었습니다",
        description: "콘텐츠 섹션이 성공적으로 수정되었습니다.",
      });
      handleClose();
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
      console.error("Update section error:", error);
      toast({
        title: "수정 실패",
        description: "섹션 수정 중 오류가 발생했습니다.",
        variant: "destructive",
      });
    },
  });

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(onClose, 200);
  };

  const onSubmit = (data: ContentFormData) => {
    if (isEditing) {
      updateSection.mutate(data);
    } else {
      createSection.mutate(data);
    }
  };

  const isPending = createSection.isPending || updateSection.isPending;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "콘텐츠 섹션 수정" : "새 콘텐츠 섹션 생성"}
          </DialogTitle>
          <DialogDescription>
            웹사이트에 표시될 콘텐츠 섹션을 {isEditing ? "수정" : "생성"}합니다.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="sectionKey"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>섹션 키 *</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="hero, about, services" 
                        {...field}
                        disabled={isEditing}
                      />
                    </FormControl>
                    <FormDescription>
                      섹션을 식별하는 고유 키 (수정 불가)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isActive"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">활성화</FormLabel>
                      <FormDescription>
                        섹션을 웹사이트에 표시할지 설정
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>제목</FormLabel>
                  <FormControl>
                    <Input placeholder="섹션 제목을 입력하세요" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="subtitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>부제목</FormLabel>
                  <FormControl>
                    <Input placeholder="섹션 부제목을 입력하세요" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>내용</FormLabel>
                  <FormControl>
                    <Textarea 
                      rows={6}
                      placeholder="섹션 내용을 입력하세요" 
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    HTML 태그도 사용 가능합니다
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleClose}>
                취소
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending 
                  ? (isEditing ? "수정 중..." : "생성 중...") 
                  : (isEditing ? "수정" : "생성")
                }
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
