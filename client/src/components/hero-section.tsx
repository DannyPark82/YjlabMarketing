import { ContentSection } from "@shared/schema";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  sections: ContentSection[];
}

export default function HeroSection({ sections }: HeroSectionProps) {
  const heroSection = sections.find(s => s.sectionKey === 'hero');
  
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
      {/* Modern geometric background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-block bg-orange-500/20 border border-orange-500/30 rounded-full px-4 py-2">
                  <span className="text-orange-500 font-medium">옷만드는 마케터</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-black leading-tight">
                  <span className="block">일반 마케터와</span>
                  <span className="block text-orange-500">조금 다릅니다</span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-300 font-medium leading-relaxed">
                  {heroSection?.content || "패션 비즈니스를 직접 경험한 마케터가 진짜 통하는 마케팅을 제공합니다"}
                </p>
              </div>
              
              <div className="flex flex-wrap gap-6">
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-black text-teal-500">60억원</div>
                  <div className="text-sm text-gray-400">단일상품 수출</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-black text-orange-500">대기업</div>
                  <div className="text-sm text-gray-400">브랜드 매각</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-black text-teal-500">글로벌</div>
                  <div className="text-sm text-gray-400">플랫폼 운영</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={scrollToContact}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg font-bold h-auto"
                >
                  프로젝트 상담받기
                </Button>
                <Button 
                  variant="outline" 
                  className="border-2 border-white/30 hover:border-white text-white px-8 py-4 text-lg font-bold h-auto bg-transparent hover:bg-white/10"
                >
                  포트폴리오 보기
                </Button>
              </div>
            </div>
            
            <div className="relative">
              {/* Professional workspace image showcasing fashion/marketing blend */}
              <img 
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
                alt="Modern fashion marketing workspace" 
                className="rounded-2xl shadow-2xl w-full h-auto transform rotate-3 hover:rotate-0 transition-transform duration-500" 
              />
              <div className="absolute -bottom-6 -left-6 bg-orange-500 text-white p-6 rounded-xl shadow-xl">
                <div className="text-2xl font-black">YJLAB</div>
                <div className="text-sm opacity-90">Fashion Marketing Expert</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
