import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import AchievementsSection from "@/components/achievements-section";
import ServicesSection from "@/components/services-section";
import ContactSection from "@/components/contact-section";
import { useQuery } from "@tanstack/react-query";
import { ContentSection } from "@shared/schema";

export default function Home() {
  const { data: sections = [] } = useQuery<ContentSection[]>({
    queryKey: ["/api/content/sections"],
  });

  const { data: settings = [] } = useQuery({
    queryKey: ["/api/settings/public"],
  });

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <HeroSection sections={sections} />
      
      {/* Problem Statement */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
              일반 마케팅회사의 문제는<br />
              <span className="text-orange-500">본인 사업 경험이 없습니다</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              YJLAB은 직접 패션 비즈니스를 성공시킨 경험으로<br />
              다른 마케팅 회사와 조금 다릅니다
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-orange-500/10 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 6a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM4 8v6h12V8H4z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">패션 사업 직접 경험</h3>
              <p className="text-gray-600 leading-relaxed">
                스포츠 브랜드 제품을 기획부터 생산, 마케팅까지 직접 경험하며 60억원 수출 달성
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-teal-500/10 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-teal-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 3.314-2.686 6-6 6s-6-2.686-6-6a5.99 5.99 0 01.332-2.027z" clipRule="evenodd"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">글로벌 플랫폼 운영</h3>
              <p className="text-gray-600 leading-relaxed">
                일본 의류 유통플랫폼과 중고 자동차 거래 플랫폼을 직접 운영하며 쌓은 실전 노하우
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-yellow-500/10 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">브랜드 매각 성공</h3>
              <p className="text-gray-600 leading-relaxed">
                직접 구축한 브랜드 라이선스를 대기업에 성공적으로 매각한 검증된 브랜딩 역량
              </p>
            </div>
          </div>
        </div>
      </section>

      <AchievementsSection sections={sections} />
      <ServicesSection sections={sections} />
      
      {/* Philosophy */}
      <section className="py-20 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              YJLAB은 <span className="text-orange-500">가장 확실한 방법으로</span><br />
              결과를 만들어냅니다
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-800/50 p-8 rounded-2xl border border-gray-700 hover:border-orange-500 transition-colors">
              <div className="text-6xl mb-4">💡</div>
              <h3 className="text-xl font-bold mb-4">직접 경험한 노하우</h3>
              <p className="text-gray-300 leading-relaxed">
                이론이 아닌 실제 패션 사업을 성공시킨 경험으로만 컨설팅합니다. 
                책에서 배운 지식이 아닌 현장에서 검증된 방법론을 제공합니다.
              </p>
            </div>

            <div className="bg-gray-800/50 p-8 rounded-2xl border border-gray-700 hover:border-teal-500 transition-colors">
              <div className="text-6xl mb-4">🎯</div>
              <h3 className="text-xl font-bold mb-4">선별적 프로젝트 수행</h3>
              <p className="text-gray-300 leading-relaxed">
                성공 가능성이 높은 프로젝트만 선별적으로 진행합니다. 
                무리한 약속보다는 확실한 성과를 약속드립니다.
              </p>
            </div>

            <div className="bg-gray-800/50 p-8 rounded-2xl border border-gray-700 hover:border-yellow-500 transition-colors">
              <div className="text-6xl mb-4">🚀</div>
              <h3 className="text-xl font-bold mb-4">장기적 파트너십</h3>
              <p className="text-gray-300 leading-relaxed">
                일회성 컨설팅이 아닌 지속적인 성장을 위한 파트너가 되어 
                함께 비즈니스를 키워나갑니다.
              </p>
            </div>
          </div>

          <div className="mt-16 text-center">
            <div className="inline-block bg-orange-500/20 border border-orange-500/30 rounded-full px-6 py-3 mb-8">
              <span className="text-orange-500 font-semibold">옷만드는 마케터의 철학</span>
            </div>
            <blockquote className="text-2xl md:text-3xl font-bold text-center max-w-4xl mx-auto leading-relaxed">
              "마케팅은 이론이 아니라 경험입니다.<br />
              직접 만들고, 팔고, 성공시킨 경험이<br />
              <span className="text-orange-500">진짜 마케팅</span>을 만듭니다."
            </blockquote>
            <div className="mt-6 text-gray-400">
              - YJLAB 대표, 옷만드는 마케터
            </div>
          </div>
        </div>
      </section>

      <ContactSection />
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="font-bold text-3xl mb-4">YJLAB</div>
              <p className="text-gray-400 text-lg mb-6 leading-relaxed">
                옷만드는 마케터가 제공하는<br />
                차별화된 마케팅 솔루션
              </p>
              <div className="flex space-x-4">
                {/* 1. 링크드인 링크 수정 */}
                <a href="https://linkedin.com/in/YOUR_PROFILE" className="w-10 h-10 bg-gray-800 hover:bg-orange-500 rounded-lg flex items-center justify-center transition-colors"> 
                {/* ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                             위의 #을 실제 링크드인 주소로 바꾸세요. */}
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    {/* LinkedIn SVG 아이콘 */}
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
                {/* 2. 인스타그램 링크 수정 */}
                <a href="https://instagram.com/YOUR_USERNAME" className="w-10 h-10 bg-gray-800 hover:bg-orange-500 rounded-lg flex items-center justify-center transition-colors">
                {/* ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                             위의 #을 실제 인스타그램 주소로 바꾸세요. */}
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    {/* Instagram SVG 아이콘 */}
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07..."/>
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-4">서비스</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-orange-500 transition-colors">패션 브랜드 마케팅</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">스타트업 마케팅</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">글로벌 진출 컨설팅</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">브랜드 전략</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-4">회사</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-orange-500 transition-colors">회사 소개</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">성공 사례</a></li>
                <li><a href="#admin" className="hover:text-orange-500 transition-colors">관리자</a></li>
                <li><a href="#contact" className="hover:text-orange-500 transition-colors">문의하기</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 YJLAB. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-orange-500 text-sm transition-colors">개인정보처리방침</a>
              <a href="#" className="text-gray-400 hover:text-orange-500 text-sm transition-colors">이용약관</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
