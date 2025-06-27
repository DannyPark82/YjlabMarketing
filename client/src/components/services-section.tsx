import { ContentSection } from "@shared/schema";
import { Button } from "@/components/ui/button";

interface ServicesSectionProps {
  sections: ContentSection[];
}

export default function ServicesSection({ sections }: ServicesSectionProps) {
  const servicesSection = sections.find(s => s.sectionKey === 'services');

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
            어떤 서비스가 <span className="text-orange-500">필요하세요?</span>
          </h2>
          <p className="text-xl text-gray-600">
            {servicesSection?.content || "옷만드는 마케터의 특화된 서비스로 당신의 비즈니스를 성장시키세요"}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          <div className="group bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl p-8 text-white hover:shadow-2xl transition-all transform hover:-translate-y-2">
            <div className="space-y-6">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"/>
                  <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"/>
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-black mb-4">패션 브랜드 마케팅</h3>
                <p className="text-lg opacity-90 leading-relaxed mb-6">
                  직접 경험한 패션 비즈니스 노하우로 브랜드 기획부터 글로벌 진출까지 
                  전 과정을 컨설팅합니다.
                </p>
                <ul className="space-y-2 text-sm opacity-80">
                  <li>• 브랜드 아이덴티티 구축</li>
                  <li>• 제품 기획 및 포지셔닝</li>
                  <li>• 온라인 마케팅 전략</li>
                  <li>• 글로벌 진출 컨설팅</li>
                </ul>
              </div>
              <Button 
                variant="secondary" 
                className="bg-white text-orange-500 hover:bg-gray-100 font-bold"
              >
                자세히 보기
              </Button>
            </div>
          </div>

          <div className="group bg-gradient-to-br from-teal-500 to-teal-600 rounded-3xl p-8 text-white hover:shadow-2xl transition-all transform hover:-translate-y-2">
            <div className="space-y-6">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd"/>
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-black mb-4">스타트업 마케팅</h3>
                <p className="text-lg opacity-90 leading-relaxed mb-6">
                  플랫폼 구축과 운영 경험을 바탕으로 스타트업의 빠른 성장을 
                  지원합니다.
                </p>
                <ul className="space-y-2 text-sm opacity-80">
                  <li>• 비즈니스 모델 검증</li>
                  <li>• 플랫폼 마케팅 전략</li>
                  <li>• 사용자 획득 전략</li>
                  <li>• 투자 유치 지원</li>
                </ul>
              </div>
              <Button 
                variant="secondary" 
                className="bg-white text-teal-500 hover:bg-gray-100 font-bold"
              >
                자세히 보기
              </Button>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gray-50 p-6 rounded-2xl hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
              </svg>
            </div>
            <h4 className="text-lg font-bold text-gray-900 mb-3">브랜드 전략</h4>
            <p className="text-gray-600 text-sm">패션 업계 경험을 바탕으로 한 차별화된 브랜드 전략 수립</p>
          </div>

          <div className="bg-gray-50 p-6 rounded-2xl hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-teal-500/10 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-teal-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 3.314-2.686 6-6 6s-6-2.686-6-6a5.99 5.99 0 01.332-2.027z" clipRule="evenodd"/>
              </svg>
            </div>
            <h4 className="text-lg font-bold text-gray-900 mb-3">글로벌 진출</h4>
            <p className="text-gray-600 text-sm">일본 시장 진출 경험을 통한 실질적인 해외 진출 컨설팅</p>
          </div>

          <div className="bg-gray-50 p-6 rounded-2xl hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-yellow-500/10 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"/>
                <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"/>
              </svg>
            </div>
            <h4 className="text-lg font-bold text-gray-900 mb-3">성과 분석</h4>
            <p className="text-gray-600 text-sm">데이터 기반의 마케팅 성과 측정 및 개선 방안 제시</p>
          </div>
        </div>
      </div>
    </section>
  );
}
