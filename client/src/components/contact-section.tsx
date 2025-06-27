import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertContactSubmissionSchema } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import type { z } from "zod";

type ContactFormData = z.infer<typeof insertContactSubmissionSchema>;

export default function ContactSection() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(insertContactSubmissionSchema),
    defaultValues: {
      companyName: "",
      contactName: "",
      email: "",
      projectContent: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      return await apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      toast({
        title: "문의가 접수되었습니다",
        description: "빠른 시일 내에 연락드리겠습니다.",
      });
      form.reset();
    },
    onError: (error) => {
      console.error("Contact submission error:", error);
      toast({
        title: "문의 접수 실패",
        description: "잠시 후 다시 시도해주세요.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ContactFormData) => {
    contactMutation.mutate(data);
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
            신중하게 <span className="text-orange-500">문의하세요</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            최대한 이곳의 정보를 보시고, 신중히 판단해주세요.<br />
            <strong>급할 것 없습니다.</strong>
          </p>
        </div>

        <div className="bg-gray-50 rounded-3xl p-8 md:p-12">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">문의 전 확인사항</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-xs font-bold">1</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">명확한 목표와 예산</p>
                      <p className="text-gray-600 text-sm">구체적인 비즈니스 목표와 예산 범위를 정해주세요</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-xs font-bold">2</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">장기적 관점</p>
                      <p className="text-gray-600 text-sm">단기적 성과보다는 지속 가능한 성장을 원하시는지</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-xs font-bold">3</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">실행 의지</p>
                      <p className="text-gray-600 text-sm">제안된 전략을 실제로 실행할 의지와 리소스</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-6">
                <h4 className="font-bold text-gray-900 mb-2">📞 연락처</h4>
                <p className="text-gray-700 mb-2">이메일: help.yjlab@gmail.com</p>
                <p className="text-gray-700 mb-2">전화: 82-10-6739-5570</p>
                <p className="text-sm text-gray-600">평일 09:00-18:00 (토/일/공휴일 휴무)</p>
              </div>
            </div>

            <div className="space-y-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>회사명 *</FormLabel>
                        <FormControl>
                          <Input placeholder="회사명을 입력하세요" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="contactName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>담당자명 *</FormLabel>
                        <FormControl>
                          <Input placeholder="담당자명을 입력하세요" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>이메일 *</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="이메일을 입력하세요" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="projectContent"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>프로젝트 내용 *</FormLabel>
                        <FormControl>
                          <Textarea 
                            rows={4} 
                            placeholder="프로젝트 목표, 예산, 일정 등을 구체적으로 작성해주세요" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    disabled={contactMutation.isPending}
                    className="w-full bg-orange-500 hover:bg-orange-600 py-4 text-lg font-bold h-auto"
                  >
                    {contactMutation.isPending ? "전송 중..." : "프로젝트 문의하기"}
                  </Button>
                </form>
              </Form>
              
              <p className="text-sm text-gray-500 text-center">
                성의 없는 문의는 회신하지 않습니다.<br />
                신중하게 작성해 주세요.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
