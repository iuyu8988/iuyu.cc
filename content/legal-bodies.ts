/**
 * 정책 문서 본문 (언어별).
 *
 * ⚠️ 초안입니다. 금형 소유 조건·결제 조건·위탁 업체가 확정된 후
 *    법무 검토를 거쳐 최종본으로 교체하세요.
 */
import type { Locale } from '@/lib/i18n';
import { BRAND_FIXED } from './brand';

const EMAIL = BRAND_FIXED.email;

export type LegalBody = {
  updated: string;
  sections: { h: string; p: string[] }[];
};

export const LEGAL_BODIES: Record<Locale, Record<string, LegalBody>> = {
  ko: {
    terms: {
      updated: '2026-01-01',
      sections: [
        { h: '제1조 (목적)', p: ['이 약관은 IUYU(이하 "회사")가 운영하는 B2B 제조 상담 사이트에서 제공하는 정보와 견적 상담 서비스의 이용 조건을 규정함을 목적으로 합니다.'] },
        { h: '제2조 (사업 범위)', p: [
          '회사는 전자담배 기기용 실리콘 보호케이스, 파우치, 그립 및 기기 보호용 액세서리의 OEM/ODM 제조·공급을 영위합니다.',
          '회사는 니코틴 액상, 팟, 리필, 궐련형·액상형 기기 완제품을 제조·판매하지 않으며, 해당 품목에 대한 온라인 판매 및 광고를 하지 않습니다.',
          '본 사이트는 소비자 대상 판매 창구가 아니며, B2B 거래 상담만을 목적으로 합니다.'] },
        { h: '제3조 (견적 및 계약)', p: [
          '사이트를 통한 문의는 계약의 청약이 아니며, 회사가 견적서를 발행하고 양 당사자가 계약서에 서명함으로써 계약이 성립합니다.',
          '견적의 유효 기간은 견적서에 명시된 기간으로 하며, 명시가 없는 경우 발행일로부터 30일입니다.',
          '원자재 가격, 환율, 물량 변동에 따라 견적이 조정될 수 있으며, 이 경우 회사는 사전에 서면으로 통지합니다.'] },
        { h: '제4조 (발주 및 납기)', p: [
          '양산 발주는 서면(전자문서 포함)으로 하며, 회사가 이를 승낙한 시점에 확정됩니다.',
          '납기는 승인된 시사출 샘플 확정 시점과 물량을 기준으로 산정합니다.',
          '천재지변, 원자재 수급 지연, 운송 파업 등 회사의 통제를 벗어난 사유로 납기가 지연되는 경우 회사는 지체 없이 통지하고 협의합니다.'] },
        { h: '제5조 (품질 및 검사)', p: [
          '승인된 시사출 샘플은 양산품의 품질 기준이 됩니다.',
          '회사는 출하 전 로트별로 치수, 체결, 외관, 재질, 조립, 포장 항목을 검사합니다.',
          '검사 결과가 승인 기준을 벗어난 경우 회사는 재작업 또는 재생산으로 대응합니다.'] },
        { h: '제6조 (지식재산권)', p: [
          '고객이 제공한 도면, 3D 데이터, 상표 등은 고객의 소유이며, 회사는 해당 목적 외로 사용하지 않습니다.',
          '회사가 자체 개발한 설계 자산과 금형 구조에 대한 권리는 회사에 있습니다.',
          '고객이 금형 제작비를 부담한 경우 해당 금형의 소유권은 계약 조건에 따라 정하며, 별도 합의가 없으면 고객에게 귀속됩니다.'] },
        { h: '제7조 (비밀유지)', p: [
          '양 당사자는 계약 과정에서 알게 된 상대방의 기술 정보, 도면, 거래 조건을 제3자에게 공개하지 않습니다.',
          '요청 시 별도의 비밀유지계약(NDA)을 체결한 후 자료를 수령합니다.'] },
        { h: '제8조 (책임의 제한)', p: [
          '회사의 배상 책임은 해당 건의 계약 금액을 한도로 합니다.',
          '회사는 고객이 제공한 도면이나 사양의 오류로 발생한 문제에 대해 책임을 지지 않습니다.',
          '제품은 기기 보호용 액세서리이며, 기기 본체의 고장·파손 자체를 방지하는 것을 보증하지 않습니다.'] },
        { h: '제9조 (준거법 및 분쟁 해결)', p: [
          '이 약관은 대한민국 법을 준거법으로 합니다.',
          '분쟁이 발생한 경우 상호 협의로 해결하며, 협의가 이루어지지 않을 경우 회사 소재지 관할 법원을 제1심 전속 관할로 합니다.'] },
      ],
    },
    privacy: {
      updated: '2026-01-01',
      sections: [
        { h: '1. 수집하는 개인정보 항목', p: [
          '필수 항목: 회사명, 담당자 성명, 이메일 주소, 문의 내용.',
          '선택 항목: 연락처, 국가/지역, 대상 기기 모델, 희망 형태, 예상 물량.',
          '자동 수집 항목: 접속 IP, 브라우저 정보, 방문 일시, 서비스 이용 기록.'] },
        { h: '2. 개인정보의 이용 목적', p: [
          '견적 검토 및 회신, 기술 상담, 샘플 및 개발 일정 협의.',
          '계약 체결 및 이행, 납기·품질 관련 커뮤니케이션.',
          '서비스 개선을 위한 통계 분석(비식별 처리).'] },
        { h: '3. 보유 및 이용 기간', p: [
          '문의 정보는 문의 처리 완료 후 1년간 보관하며, 이후 즉시 파기합니다.',
          '계약이 체결된 경우 계약 및 거래 기록은 관련 법령에 따라 보존합니다.',
          '계약 또는 청약철회 등에 관한 기록: 5년 (전자상거래법)',
          '대금 결제 및 재화 공급에 관한 기록: 5년 (전자상거래법)',
          '웹사이트 방문 기록: 3개월 (통신비밀보호법)'] },
        { h: '4. 개인정보의 제3자 제공', p: [
          '회사는 원칙적으로 이용자의 개인정보를 제3자에게 제공하지 않습니다.',
          '다만 배송·운송이 필요한 경우 운송사에 수하인 정보를 제공하며, 이 경우 사전에 고지하고 동의를 받습니다.'] },
        { h: '5. 개인정보 처리의 위탁', p: [
          '회사는 서비스 운영을 위해 이메일 발송, 호스팅({호스팅 제공자}) 등의 업무를 위탁할 수 있습니다.',
          '위탁 계약 시 개인정보 보호법 제26조에 따라 안전성 확보 조치를 명시합니다.'] },
        { h: '6. 이용자의 권리', p: [
          '이용자는 언제든지 자신의 개인정보를 조회, 수정, 삭제, 처리정지를 요구할 수 있습니다.',
          `요청은 ${EMAIL} 로 접수하며, 회사는 지체 없이 조치합니다.`] },
        { h: '7. 쿠키 및 로컬스토리지', p: [
          '회사는 사업 범위 고지 확인 여부를 기억하기 위해 로컬스토리지를 사용합니다.',
          '해당 기록은 이용자 브라우저에만 저장되며 서버로 전송되지 않습니다.',
          '이용자는 브라우저 설정에서 저장을 거부할 수 있으며, 이 경우 고지가 매 방문 표시됩니다.'] },
        { h: '8. 개인정보 보호책임자', p: [
          `성명: ${BRAND_FIXED.legal.ceo}`,
          `연락처: ${EMAIL}`,
          '이용자는 개인정보 관련 문의, 불만, 피해 구제를 위 연락처로 요청할 수 있습니다.'] },
      ],
    },
    youth: {
      updated: '2026-01-01',
      sections: [
        { h: '1. 사업 성격', p: [
          'IUYU는 B2B 제조사이며, 소비자에게 제품을 직접 판매하지 않습니다. 본 사이트는 사업자 관계자를 대상으로 한 제조 상담 창구입니다.',
          '회사가 취급하는 품목은 실리콘 보호케이스, 파우치, 그립 등 기기 보호용 액세서리로 한정됩니다.'] },
        { h: '2. 니코틴 제품 미취급', p: [
          '회사는 니코틴 액상, 팟, 리필, 궐련형·액상형 기기 완제품을 제조·판매하지 않습니다.',
          '온라인상에서 니코틴 제품의 판매·광고를 하지 않으며, 관련 문의는 접수하지 않습니다.'] },
        { h: '3. 청소년 보호 조치', p: [
          '사이트 최초 접속 시 사업 범위와 대상 연령을 고지하고 확인을 요청합니다.',
          '청소년의 건강을 보호하기 위해 청소년을 대상으로 하는 채널에 광고를 집행하지 않습니다.',
          '흡연을 권유하거나 미화하는 표현을 사용하지 않으며, 건강 관련 효능·효과를 표시하지 않습니다.',
          '고객사가 청소년 대상 판매 채널을 운영하는 것으로 확인될 경우 거래를 중단할 수 있습니다.'] },
        { h: '4. 고객사 협조 요청', p: [
          '회사의 제품을 유통하는 고객사는 목적국의 청소년 보호 법규를 준수해야 합니다.',
          '목적국 법규상 미성년자 판매가 제한되는 경우, 고객사는 연령 확인 절차를 마련해야 합니다.'] },
        { h: '5. 신고 및 문의', p: [
          `청소년 보호 관련 우려 사항은 ${EMAIL} 로 알려주시면 즉시 확인합니다.`,
          '청소년 상담은 청소년상담복지센터(1388)를 통해 진행할 수 있습니다.'] },
      ],
    },
    quality: {
      updated: '2026-01-01',
      sections: [
        { h: '1. 품질 기준', p: [
          '양산품의 품질 기준은 고객이 승인한 시사출 샘플입니다.',
          '승인 시점에 확인된 치수, 외관, 체결감, 색상이 기준이 되며, 샘플과 기준서는 양 당사자가 보관합니다.'] },
        { h: '2. 출하 검사 항목', p: [
          '치수: 주요 치수 측정, 게이트·파팅라인 확인.',
          '체결: 자석 인장력, 개폐 반복 내구 확인.',
          '외관: 플로우마크, 버, 이물, 컬러 편차 육안 검사.',
          '재질: 경도(쇼어 A), 인장 강도 확인.',
          '조립: 실제 기기 장착 후 간섭·유격 확인.',
          '포장: 라벨, 수량, 포장 상태 확인.'] },
        { h: '3. 클레임 접수', p: [
          '클레임은 제품 수령 후 14일 이내에 접수해 주세요.',
          '접수 시 로트 번호, 문제 수량, 문제 항목, 사진 또는 영상을 함께 보내주시면 검토가 빠릅니다.',
          `접수처: ${EMAIL}`] },
        { h: '4. 원인 판정 및 대응', p: [
          '회사는 접수 후 5영업일 내에 원인을 판정하고 대응 방안을 회신합니다.',
          '제조상 과실로 확인된 경우 무상 재작업 또는 재생산으로 대응합니다.',
          '고객이 제공한 도면·사양의 오류, 고객 측 보관·취급 부주의, 사용 환경에 따른 변색·변형은 보상 대상에서 제외됩니다.'] },
        { h: '5. 보상 한도', p: [
          '회사의 보상 책임은 해당 결함 로트의 계약 금액을 한도로 합니다.',
          '간접 손실, 기대 이익 상실, 제3자에 대한 손해는 보상 범위에 포함되지 않습니다. 필요한 경우 계약 시 별도 합의합니다.'] },
        { h: '6. 예방 조치', p: ['동일 결함이 반복될 경우 회사는 금형 수정, 성형 조건 변경, 검사 항목 추가 등의 재발 방지 조치를 시행하고 결과를 고객에게 통지합니다.'] },
      ],
    },
    ip: {
      updated: '2026-01-01',
      sections: [
        { h: '1. 고객 제공 자료', p: [
          '고객이 제공한 도면, 3D 데이터, 사양서, 상표, 디자인은 고객의 소유입니다.',
          '회사는 해당 자료를 계약 목적 외로 사용하지 않으며, 제3자에게 제공하지 않습니다.',
          '계약 종료 시 요청에 따라 자료를 반환하거나 파기하고 그 결과를 통지합니다.'] },
        { h: '2. 회사 보유 설계 자산', p: [
          'IUYU가 자체 개발한 케이스 설계, 금형 구조, 성형 조건 데이터에 대한 권리는 회사에 있습니다.',
          'ODM 방식으로 공급되는 제품의 설계 자산은 회사에 귀속되며, 고객은 계약에서 정한 범위 내에서 사용할 수 있습니다.'] },
        { h: '3. 금형 소유권', p: [
          '고객이 금형 제작비를 부담한 경우 해당 금형의 소유권은 계약 조건에 따라 정합니다.',
          '별도 합의가 없는 경우 금형 소유권은 고객에게 귀속되며, 회사는 보관·유지보수 책임을 부담합니다.',
          '금형 이관을 요청하는 경우 이관 시점의 상태 확인 후 인계하며, 이관 비용은 협의로 정합니다.',
          '금형을 2년 이상 사용하지 않는 경우 회사는 서면 통지 후 보관 장소와 조건을 협의할 수 있습니다.'] },
        { h: '4. 비밀유지', p: [
          '양 당사자는 계약 과정에서 알게 된 상대방의 기술 정보, 도면, 거래 조건, 가격 정보를 제3자에게 공개하지 않습니다.',
          '비밀유지 의무는 계약 종료 후 3년간 존속합니다.',
          '요청 시 계약 체결 전에 별도의 비밀유지계약(NDA)을 체결합니다.'] },
        { h: '5. 제3자 권리 침해', p: [
          '고객이 제공한 도면·디자인이 제3자의 권리를 침해하는 경우 그 책임은 고객에게 있습니다.',
          '회사가 자체 설계로 공급한 제품이 제3자의 권리를 침해한다는 주장이 제기된 경우, 회사는 해당 제품의 공급 중단 및 대체 설계 제안 등의 조치를 합니다.'] },
        { h: '6. 문의', p: [`지식재산권 관련 문의: ${BRAND_FIXED.emailTech}`] },
      ],
    },
  },

  en: {
    terms: {
      updated: '2026-01-01',
      sections: [
        { h: '1. Purpose', p: ['These terms govern the use of the information and quotation services provided on the B2B manufacturing enquiry site operated by IUYU (the "Company").'] },
        { h: '2. Scope of business', p: [
          'The Company manufactures and supplies silicone protective cases, pouches, grips and device protection accessories on an OEM/ODM basis.',
          'The Company does not manufacture or sell nicotine liquid, pods, refills or finished devices (heated-tobacco or liquid type), and does not advertise or sell such items online.',
          'This site is not a consumer sales channel; it exists solely for B2B trade enquiries.'] },
        { h: '3. Quotations and contracts', p: [
          'An enquiry submitted through this site is not an offer to contract. A contract is formed when the Company issues a quotation and both parties sign an agreement.',
          'A quotation is valid for the period stated on it, or for 30 days from issue if no period is stated.',
          'Quotations may be adjusted for movements in raw material prices, exchange rates or volumes. In that case the Company gives prior written notice.'] },
        { h: '4. Orders and delivery', p: [
          'Mass production orders are placed in writing (including electronic form) and are confirmed when the Company accepts them.',
          'Delivery schedules are calculated from confirmation of the approved trial-shot sample and the order volume.',
          'Where delivery is delayed by causes beyond the Company\u2019s control — natural disaster, raw material shortages, transport strikes — the Company notifies the customer without delay and consults on a revised schedule.'] },
        { h: '5. Quality and inspection', p: [
          'The approved trial-shot sample is the quality standard for mass production.',
          'The Company inspects dimensions, closure, appearance, material, assembly and packaging lot by lot before shipment.',
          'Where inspection results fall outside the approved standard, the Company reworks or re-produces.'] },
        { h: '6. Intellectual property', p: [
          'Drawings, 3D data and trademarks provided by the customer remain the customer\u2019s property and are not used for any other purpose.',
          'Rights in design assets and mold structures developed by the Company belong to the Company.',
          'Where the customer bears the mold cost, ownership of that mold is determined by the contract and, absent separate agreement, vests in the customer.'] },
        { h: '7. Confidentiality', p: [
          'Neither party discloses the other\u2019s technical information, drawings or commercial terms obtained during the engagement.',
          'On request, a separate non-disclosure agreement is signed before materials are received.'] },
        { h: '8. Limitation of liability', p: [
          'The Company\u2019s liability is limited to the contract value of the engagement concerned.',
          'The Company is not liable for problems arising from errors in drawings or specifications provided by the customer.',
          'The products are protective accessories and do not warrant against failure or damage to the device itself.'] },
        { h: '9. Governing law and disputes', p: [
          'These terms are governed by the laws of the Republic of Korea.',
          'Disputes are resolved through consultation; failing that, the court having jurisdiction over the Company\u2019s location has exclusive first-instance jurisdiction.'] },
      ],
    },
    privacy: {
      updated: '2026-01-01',
      sections: [
        { h: '1. Information we collect', p: [
          'Required: company name, contact name, email address, enquiry content.',
          'Optional: telephone, country/region, target device model, desired form, expected volume.',
          'Automatically collected: IP address, browser information, visit time, service usage records.'] },
        { h: '2. How we use it', p: [
          'Reviewing and responding to enquiries, technical consultation, coordinating samples and development schedules.',
          'Concluding and performing contracts, and communication on delivery and quality.',
          'Statistical analysis to improve our service (de-identified).'] },
        { h: '3. Retention', p: [
          'Enquiry information is kept for one year after the enquiry is resolved, then destroyed immediately.',
          'Where a contract is concluded, contract and transaction records are retained as required by law.',
          'Records of contracts or withdrawal of offers: 5 years (Korean E-Commerce Act)',
          'Records of payment and supply of goods: 5 years (Korean E-Commerce Act)',
          'Website visit records: 3 months (Korean Protection of Communications Secrets Act)'] },
        { h: '4. Sharing with third parties', p: [
          'The Company does not in principle provide personal data to third parties.',
          'Where shipping or transport is required, consignee details are provided to the carrier, with prior notice and consent.'] },
        { h: '5. Processing on our behalf', p: [
          'The Company may entrust tasks such as email delivery and hosting ({hosting provider}) to service providers.',
          'Entrustment agreements specify security measures in accordance with Article 26 of the Korean Personal Information Protection Act.'] },
        { h: '6. Your rights', p: [
          'You may at any time request access to, correction of, deletion of, or suspension of processing of your personal data.',
          `Requests may be sent to ${EMAIL} and the Company acts without delay.`] },
        { h: '7. Cookies and local storage', p: [
          'The Company uses local storage to remember whether you have acknowledged the scope-of-business notice.',
          'That record is stored only in your browser and is never sent to a server.',
          'You may refuse storage in your browser settings; the notice will then be shown on every visit.'] },
        { h: '8. Data protection contact', p: [
          `Name: ${BRAND_FIXED.legal.ceo}`,
          `Contact: ${EMAIL}`,
          'You may direct questions, complaints or requests for remedy regarding personal data to the contact above.'] },
      ],
    },
    youth: {
      updated: '2026-01-01',
      sections: [
        { h: '1. Nature of our business', p: [
          'IUYU is a B2B manufacturer and does not sell products directly to consumers. This site is a manufacturing enquiry channel for business partners.',
          'Our product scope is limited to silicone protective cases, pouches, grips and similar device protection accessories.'] },
        { h: '2. No nicotine products', p: [
          'The Company does not manufacture or sell nicotine liquid, pods, refills or finished devices (heated-tobacco or liquid type).',
          'We do not advertise or sell nicotine products online and do not accept enquiries for them.'] },
        { h: '3. Youth protection measures', p: [
          'On first visit the site displays our business scope and target audience and asks for acknowledgement.',
          'We do not run advertising on channels directed at young people.',
          'We do not use language that encourages or glamorises smoking, and we make no health-related efficacy claims.',
          'Where a customer is found to operate sales channels targeting minors, we may terminate the trading relationship.'] },
        { h: '4. What we ask of customers', p: [
          'Customers distributing our products must comply with youth protection laws in their destination markets.',
          'Where local law restricts sales to minors, customers must implement age verification procedures.'] },
        { h: '5. Reporting and enquiries', p: [
          `Report any youth protection concern to ${EMAIL} and we will investigate immediately.`,
          'Youth counselling is available in Korea through the Youth Counselling and Welfare Centre (1388).'] },
      ],
    },
    quality: {
      updated: '2026-01-01',
      sections: [
        { h: '1. Quality standard', p: [
          'The quality standard for mass production is the trial-shot sample approved by the customer.',
          'Dimensions, appearance, closure feel and colour confirmed at approval become the standard; both parties retain the sample and the specification sheet.'] },
        { h: '2. Pre-shipment inspection', p: [
          'Dimensions: measurement of key dimensions, gate and parting line check.',
          'Closure: magnet pull force, repeated open/close durability.',
          'Appearance: visual check for flow marks, burrs, foreign matter and colour deviation.',
          'Material: hardness (Shore A), tensile strength.',
          'Assembly: interference and play checked with the actual device fitted.',
          'Packaging: label, quantity and packing condition.'] },
        { h: '3. Submitting a claim', p: [
          'Claims must be submitted within 14 days of receiving the goods.',
          'Including the lot number, affected quantity, defect type and photos or video speeds up review.',
          `Submit to: ${EMAIL}`] },
        { h: '4. Assessment and response', p: [
          'The Company determines the cause and replies with a proposed response within five business days.',
          'Where a manufacturing fault is confirmed, we rework or re-produce at no charge.',
          'Errors in customer-supplied drawings or specifications, customer mishandling or storage, and discolouration or deformation caused by the use environment are excluded from compensation.'] },
        { h: '5. Limit of compensation', p: [
          'The Company\u2019s liability is limited to the contract value of the defective lot.',
          'Indirect losses, lost anticipated profit and damage to third parties are not covered, unless separately agreed in the contract.'] },
        { h: '6. Preventive action', p: ['Where the same defect recurs, the Company implements preventive measures such as mold modification, changes to molding conditions or additional inspection items, and notifies the customer of the outcome.'] },
      ],
    },
    ip: {
      updated: '2026-01-01',
      sections: [
        { h: '1. Materials provided by the customer', p: [
          'Drawings, 3D data, specifications, trademarks and designs provided by the customer remain the customer\u2019s property.',
          'The Company does not use them for any purpose other than the engagement and does not disclose them to third parties.',
          'On termination, materials are returned or destroyed at the customer\u2019s request and the outcome is confirmed.'] },
        { h: '2. Design assets held by the Company', p: [
          'Rights in case designs, mold structures and molding condition data developed by IUYU belong to the Company.',
          'Design assets in products supplied on an ODM basis vest in the Company; the customer may use them within the scope set out in the contract.'] },
        { h: '3. Mold ownership', p: [
          'Where the customer bears the mold cost, ownership is determined by the contract.',
          'Absent separate agreement, the mold belongs to the customer and the Company is responsible for its storage and maintenance.',
          'Where transfer of a mold is requested, its condition is verified at the time of handover and transfer costs are agreed between the parties.',
          'Where a mold is unused for two years or more, the Company may give written notice and agree on storage location and terms.'] },
        { h: '4. Confidentiality', p: [
          'Neither party discloses the other\u2019s technical information, drawings, commercial terms or pricing to third parties.',
          'The confidentiality obligation survives for three years after the engagement ends.',
          'On request, a separate non-disclosure agreement is signed before the contract is concluded.'] },
        { h: '5. Third-party rights', p: [
          'Responsibility for drawings or designs provided by the customer that infringe third-party rights rests with the customer.',
          'Where a product supplied from the Company\u2019s own design is alleged to infringe third-party rights, the Company will suspend supply and propose an alternative design.'] },
        { h: '6. Contact', p: [`Intellectual property enquiries: ${BRAND_FIXED.emailTech}`] },
      ],
    },
  },

  zh: {
    terms: {
      updated: '2026-01-01',
      sections: [
        { h: '第一条（目的）', p: ['本条款旨在规定使用 IUYU（以下简称"公司"）运营的 B2B 制造询价网站所提供的信息与报价服务的条件。'] },
        { h: '第二条（经营范围）', p: [
          '公司以 OEM/ODM 方式制造并供应电子烟设备用硅胶保护套、收纳袋、握把套及设备防护配件。',
          '公司不制造也不销售尼古丁烟油、烟弹、补充装及设备整机（加热不燃烧型与雾化型），亦不进行相关品类的线上销售与广告。',
          '本站不是面向消费者的销售渠道，仅用于 B2B 交易咨询。'] },
        { h: '第三条（报价与合同）', p: [
          '通过本站提交的咨询不构成合同要约。公司出具报价单、双方签署合同后，合同成立。',
          '报价有效期以报价单载明为准；未载明的，为出具日起 30 日。',
          '原材料价格、汇率、数量变动时报价可能调整，此种情况下公司会提前书面通知。'] },
        { h: '第四条（下单与交期）', p: [
          '量产订单以书面（含电子形式）下达，经公司接受后确定。',
          '交期以确认的试模样品签样时点与订单数量为基准计算。',
          '因不可抗力、原材料供应延迟、运输罢工等公司无法控制的原因导致交期延迟时，公司应立即通知并协商。'] },
        { h: '第五条（品质与检验）', p: [
          '经确认的试模样品为量产品的品质标准。',
          '公司在出货前按批次检验尺寸、扣合、外观、材料、装配与包装项目。',
          '检验结果超出确认标准时，公司以返工或重做处理。'] },
        { h: '第六条（知识产权）', p: [
          '客户提供的图纸、3D 数据、商标等归客户所有，公司不将其用于约定目的之外的用途。',
          '公司自主开发的设计资产与模具结构的权利归公司所有。',
          '客户承担开模费用的，该模具的所有权依合同条件确定；无另行约定时归客户所有。'] },
        { h: '第七条（保密）', p: [
          '双方不得向第三方披露在合作过程中知悉的对方技术信息、图纸与交易条件。',
          '应要求可在接收资料前签署单独的保密协议（NDA）。'] },
        { h: '第八条（责任限制）', p: [
          '公司的赔偿责任以该项目合同金额为限。',
          '因客户提供的图纸或规格有误产生的问题，公司不承担责任。',
          '产品为设备防护配件，不保证设备本体不发生故障或损坏。'] },
        { h: '第九条（准据法与争议解决）', p: [
          '本条款以韩国法律为准据法。',
          '发生争议时双方协商解决；协商不成的，以公司所在地有管辖权的法院为一审专属管辖。'] },
      ],
    },
    privacy: {
      updated: '2026-01-01',
      sections: [
        { h: '1. 收集的个人信息项目', p: [
          '必填：公司名称、联系人姓名、邮箱地址、咨询内容。',
          '选填：联系电话、国家/地区、目标机型、期望形态、预估数量。',
          '自动收集：访问 IP、浏览器信息、访问时间、服务使用记录。'] },
        { h: '2. 使用目的', p: [
          '报价评审与回复、技术咨询、样品与开发排期协商。',
          '合同签订与履行、交期与品质相关沟通。',
          '用于服务改进的统计分析（去标识化处理）。'] },
        { h: '3. 保存期限', p: [
          '咨询信息在咨询处理完成后保存 1 年，之后立即销毁。',
          '签订合同的，合同与交易记录依相关法律保存。',
          '关于合同或撤销要约的记录：5 年（韩国电子商交易法）',
          '关于付款及商品供应的记录：5 年（韩国电子商交易法）',
          '网站访问记录：3 个月（韩国通信秘密保护法）'] },
        { h: '4. 向第三方提供', p: [
          '公司原则上不向第三方提供用户的个人信息。',
          '需要配送或运输时，会向承运方提供收件人信息，并事先告知并取得同意。'] },
        { h: '5. 委托处理', p: [
          '公司可将邮件发送、主机托管（{호스팅 제공자}）等业务委托给服务商。',
          '委托时将依韩国个人信息保护法第 26 条明确安全保障措施。'] },
        { h: '6. 用户权利', p: [
          '用户可随时要求查阅、更正、删除或停止处理其个人信息。',
          `请求请发送至 ${EMAIL}，公司将及时处理。`] },
        { h: '7. Cookie 与本地存储', p: [
          '公司使用本地存储记住您是否已确认经营范围告知。',
          '该记录仅保存在您的浏览器中，不会上传至服务器。',
          '您可以在浏览器设置中拒绝保存，此时每次访问都会显示该告知。'] },
        { h: '8. 个人信息保护负责人', p: [
          `姓名：${BRAND_FIXED.legal.ceo}`,
          `联系方式：${EMAIL}`,
          '用户可通过上述联系方式提出个人信息相关的咨询、投诉或救济请求。'] },
      ],
    },
    youth: {
      updated: '2026-01-01',
      sections: [
        { h: '1. 业务性质', p: [
          'IUYU 是 B2B 制造商，不向消费者直接销售产品。本站是面向企业客户的制造询价渠道。',
          '公司经营的产品限于硅胶保护套、收纳袋、握把套等设备防护配件。'] },
        { h: '2. 不涉及尼古丁产品', p: [
          '公司不制造也不销售尼古丁烟油、烟弹、补充装及设备整机（加热不燃烧型与雾化型）。',
          '不在线上销售或宣传尼古丁产品，也不受理相关咨询。'] },
        { h: '3. 青少年保护措施', p: [
          '首次访问时会告知经营范围与适用年龄并请求确认。',
          '不在面向青少年的渠道投放广告。',
          '不使用劝诱或美化吸烟的表述，不标示健康相关功效。',
          '若发现客户经营面向未成年人的销售渠道，公司可终止交易。'] },
        { h: '4. 对客户的请求', p: [
          '经销公司产品的客户须遵守目的国的青少年保护法规。',
          '目的国法规限制向未成年人销售时，客户应建立年龄确认程序。'] },
        { h: '5. 举报与咨询', p: [
          `如发现青少年保护相关问题，请发送至 ${EMAIL}，我们将立即核查。`,
          '青少年咨询可通过韩国青少年咨询福利中心（1388）进行。'] },
      ],
    },
    quality: {
      updated: '2026-01-01',
      sections: [
        { h: '1. 品质标准', p: [
          '量产品的品质标准为客户确认的试模样品。',
          '确认时核定的尺寸、外观、扣合手感与颜色即为标准，样品与规格书由双方各自保存。'] },
        { h: '2. 出货检验项目', p: [
          '尺寸：关键尺寸测量，确认进胶口与分型面。',
          '扣合：磁铁拉力、反复开合耐久。',
          '外观：目视检查流痕、毛边、异物、色差。',
          '材料：硬度（邵氏 A）、拉伸强度。',
          '装配：装入实际设备后确认干涉与间隙。',
          '包装：标签、数量、包装状态。'] },
        { h: '3. 索赔受理', p: [
          '请在收到货物后 14 日内提交索赔。',
          '同时提供批次号、不良数量、不良项目与照片或视频，可加快评审。',
          `受理邮箱：${EMAIL}`] },
        { h: '4. 原因判定与处理', p: [
          '公司在受理后 5 个工作日内判定原因并回复处理方案。',
          '确认为制造过失的，免费返工或重做。',
          '客户提供的图纸或规格有误、客户保管与操作不当、使用环境导致的变色变形，不在赔偿范围内。'] },
        { h: '5. 赔偿限额', p: [
          '公司的赔偿责任以该不良批次的合同金额为限。',
          '间接损失、预期利益损失及对第三方的损害不在赔偿范围内；必要时可在合同中另行约定。'] },
        { h: '6. 预防措施', p: ['同一不良反复发生时，公司将采取修模、调整成型条件、增加检验项目等预防措施，并将结果通知客户。'] },
      ],
    },
    ip: {
      updated: '2026-01-01',
      sections: [
        { h: '1. 客户提供的资料', p: [
          '客户提供的图纸、3D 数据、规格书、商标与外观设计归客户所有。',
          '公司不将其用于约定目的之外的用途，也不提供给第三方。',
          '合同终止时，可应要求返还或销毁资料并告知结果。'] },
        { h: '2. 公司持有的设计资产', p: [
          'IUYU 自主开发的保护套设计、模具结构与成型条件数据的权利归公司所有。',
          '以 ODM 方式供应的产品，其设计资产归公司所有，客户可在合同约定范围内使用。'] },
        { h: '3. 模具所有权', p: [
          '客户承担开模费用的，模具所有权依合同条件确定。',
          '无另行约定时，模具所有权归客户，公司承担保管与维护责任。',
          '要求移交模具时，在确认移交时点的状态后交接，移交费用由双方协商。',
          '模具闲置超过 2 年时，公司可书面通知并协商保管地点与条件。'] },
        { h: '4. 保密', p: [
          '双方不得向第三方披露在合作过程中知悉的对方技术信息、图纸、交易条件与价格信息。',
          '保密义务在合同终止后继续有效 3 年。',
          '应要求可在签订合同前签署单独的保密协议（NDA）。'] },
        { h: '5. 第三方权利侵害', p: [
          '客户提供的图纸或设计侵害第三方权利的，责任由客户承担。',
          '公司自主设计供应的产品被主张侵害第三方权利时，公司将停止该产品供应并提出替代设计方案。'] },
        { h: '6. 联系方式', p: [`知识产权相关咨询：${BRAND_FIXED.emailTech}`] },
      ],
    },
  },
};
