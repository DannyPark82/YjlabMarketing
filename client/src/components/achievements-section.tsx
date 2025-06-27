import { ContentSection } from "@shared/schema";

interface AchievementsSectionProps {
  sections: ContentSection[];
}

export default function AchievementsSection({ sections }: AchievementsSectionProps) {
  const achievementsSection = sections.find(s => s.sectionKey === 'achievements');

  return (
    <section id="achievements" className="py-20 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            <span className="text-orange-500">실제 성과</span>로 증명하는<br />
            마케팅 전문성
          </h2>
          <p className="text-xl text-gray-300">
            {achievementsSection?.content || "이론이 아닌 실전에서 검증된 마케팅 역량"}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="text-center p-6 bg-gray-800/50 rounded-2xl border border-gray-700 hover:border-orange-500 transition-colors">
            <div className="text-4xl md:text-5xl font-black text-orange-500 mb-2">60억원</div>
            <div className="text-lg font-semibold mb-2">수출 실적</div>
            <div className="text-sm text-gray-400">스포츠 브랜드 단일 상품</div>
          </div>

          <div className="text-center p-6 bg-gray-800/50 rounded-2xl border border-gray-700 hover:border-teal-500 transition-colors">
            <div className="text-4xl md:text-5xl font-black text-teal-500 mb-2">대기업</div>
            <div className="text-lg font-semibold mb-2">브랜드 매각</div>
            <div className="text-sm text-gray-400">라이선스 성공 매각</div>
          </div>

          <div className="text-center p-6 bg-gray-800/50 rounded-2xl border border-gray-700 hover:border-yellow-500 transition-colors">
            <div className="text-4xl md:text-5xl font-black text-yellow-500 mb-2">2개국</div>
            <div className="text-lg font-semibold mb-2">플랫폼 운영</div>
            <div className="text-sm text-gray-400">일본, 한국 시장</div>
          </div>

          <div className="text-center p-6 bg-gray-800/50 rounded-2xl border border-gray-700 hover:border-green-500 transition-colors">
            <div className="text-4xl md:text-5xl font-black text-green-500 mb-2">다수</div>
            <div className="text-lg font-semibold mb-2">성공 사례</div>
            <div className="text-sm text-gray-400">패션&마케팅 융합</div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-3xl font-black">패션 업계 경험을 바탕으로 한<br /><span className="text-orange-500">차별화된 마케팅</span></h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                단순한 마케팅 이론이 아닌, 실제 패션 비즈니스를 성공시킨 경험을 통해 
                고객의 비즈니스를 깊이 이해하고 실질적인 성과를 만들어냅니다.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span className="text-gray-300">제품 기획부터 생산, 유통, 마케팅까지 전 과정 경험</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                <span className="text-gray-300">글로벌 시장 진출 및 플랫폼 운영 노하우</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="text-gray-300">브랜드 가치 증대 및 성공적인 엑시트 경험</span>
              </div>
            </div>
          </div>

          <div className="relative">
            {/* Business success and export shipping visualization */}
            <img 
              src="https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
              alt="Global business success and shipping operations" 
              className="rounded-2xl shadow-2xl w-full h-auto" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent rounded-2xl"></div>
            <div className="absolute bottom-6 left-6 text-white">
              <div className="text-sm opacity-80">검증된 성과</div>
              <div className="text-xl font-bold">글로벌 비즈니스 경험</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
