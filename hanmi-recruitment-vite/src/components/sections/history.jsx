const SectionHistory = () => (
  <section className="history" id="history" aria-labelledby="history-title">
        <div className="history__inner">
          {/* 접힘 대상 영역 : 초기 높이 = 화면 2/3 (JS 가 .is-collapsed 부여) */}
          <div className="history__content" id="history-content">
            <h2 className="history__title" id="history-title">
              한미의 도전은 작은 가능성에서<br />시작되었습니다.
            </h2>
            <p className="history__num53" aria-label="창립 53주년">
              53<span>th</span>
            </p>
            <img
              className="history__deco history__deco--star updown"
              src="./images/obj_star_big.png"
              alt=""
              aria-hidden="true"
              width="240"
              height="288"
              loading="lazy"
            />

            <div className="history__timeline">
              {/* 1행 : 1973~2001 */}
              <article className="history__row history__row--l history__row--1">
                <h3 className="history__period">1973~2001</h3>
                <p className="history__lead">한계를 하나씩 넘을 때마다,</p>
                <div className="history__info">
                  <ul className="history__list">
                    <li className="history__item">
                      <span className="history__year">1973</span
                      ><span className="history__text"
                        >한미약품공업주식회사 설립</span
                      >
                    </li>
                    <li className="history__item">
                      <span className="history__year">1984</span
                      ><span className="history__text">팔탄 GMP 공장 신축</span>
                    </li>
                    <li className="history__item">
                      <span className="history__year">1989</span
                      ><span className="history__text"
                        >세프트리악손 제조방법 Roche사 기술 수출</span
                      >
                    </li>
                    <li className="history__item">
                      <span className="history__year">1997</span
                      ><span className="history__text"
                        >마이크로에멀전 제제기술 Novartis사 기술 수출</span
                      >
                    </li>
                  </ul>
                  <span className="history__dots" aria-hidden="true"></span>
                </div>
                <figure className="history__media">
                  <img
                    src="./images/obj_his1.png"
                    alt="텐텐·쎄쎄 제품"
                    width="750"
                    height="404"
                    loading="lazy"
                  />
                </figure>
                <img
                  className="history__deco history__deco--beaker updown"
                  src="./images/obj_beaker.png"
                  alt=""
                  aria-hidden="true"
                  width="240"
                  height="288"
                  loading="lazy"
                />
              </article>

              {/* 2행 : 2002~2010 */}
              <article className="history__row history__row--r history__row--2">
                <h3 className="history__period">2002~2010</h3>
                <div className="history__info">
                  <ul className="history__list">
                    <li className="history__item">
                      <span className="history__year">2004</span
                      ><span className="history__text"
                        >국내 최초 고혈압치료제 ‘아모디핀’ 미국특허 획득</span
                      >
                    </li>
                    <li className="history__item">
                      <span className="history__year">2006</span
                      ><span className="history__text"
                        >세계 최초 유소아 해열 시럽제 개량신약 ‘맥시부펜’ 개발
                        성공</span
                      >
                    </li>
                    <li className="history__item">
                      <span className="history__year">2008</span
                      ><span className="history__text"
                        >국내 최초 주사용항생제 세프트리악손 美 FDA 승인</span
                      >
                    </li>
                    <li className="history__item">
                      <span className="history__year">2009</span
                      ><span className="history__text"
                        >세계최초 암로디핀+로살탄 복합제 ‘아모잘탄’ 발매</span
                      >
                    </li>
                  </ul>
                  <span className="history__dots" aria-hidden="true"></span>
                </div>
                <figure className="history__media">
                  <img
                    src="./images/obj_his2.png"
                    alt="함께 도약하는 사람들의 실루엣"
                    width="830"
                    height="600"
                    loading="lazy"
                  />
                </figure>
                <img
                  className="history__deco history__deco--blur1"
                  src="./images/obj_mol_blur1.png"
                  alt=""
                  aria-hidden="true"
                  width="420"
                  height="465"
                  loading="lazy"
                />
                <img
                  className="history__deco history__deco--micro updown"
                  src="./images/obj_microscope.png"
                  alt=""
                  aria-hidden="true"
                  width="218"
                  height="306"
                  loading="lazy"
                />
              </article>

              {/* 3행 : 2011~2015 */}
              <article className="history__row history__row--l history__row--3">
                <h3 className="history__period">2011~2015</h3>
                <p className="history__lead">새로운 가능성이 현실이 되었어요.</p>
                <div className="history__info">
                  <ul className="history__list">
                    <li className="history__item">
                      <span className="history__year">2011</span
                      ><span className="history__text"
                        >MSD와 ‘아모잘탄’ 50여개국 수출 계약 체결</span
                      >
                    </li>
                    <li className="history__item">
                      <span className="history__year">2012</span
                      ><span className="history__text"
                        >‘LAPS-GCSF’ 美 스펙트럼사와 공동개발 및 상업화
                        계약</span
                      >
                    </li>
                    <li className="history__item">
                      <span className="history__year">2013</span
                      ><span className="history__text"
                        >국내 개량신약 최초 미국 FDA 승인 및 미국 출시
                        ‘에소메졸’</span
                      >
                    </li>
                    <li className="history__item">
                      <span className="history__year">2014</span
                      ><span className="history__text"
                        >‘트리약손’ 국내 최초 유럽 4개국 시판 허가</span
                      >
                    </li>
                    <li className="history__item">
                      <span className="history__year">2015</span
                      ><span className="history__text"
                        >한국 사상 최대규모 릴레이 기술수출</span
                      >
                    </li>
                  </ul>
                  <span className="history__dots" aria-hidden="true"></span>
                </div>
                <figure className="history__media">
                  <img
                    src="./images/obj_his3.png"
                    alt="에소메졸 제품과 스펙트럼 파마슈티컬스 로고"
                    width="1000"
                    height="508"
                    loading="lazy"
                  />
                </figure>
                <img
                  className="history__deco history__deco--blur2"
                  src="./images/obj_mol_blur2.png"
                  alt=""
                  aria-hidden="true"
                  width="338"
                  height="372"
                  loading="lazy"
                />
              </article>

              {/* 4행 : 2016~2020 */}
              <article className="history__row history__row--r history__row--4">
                <h3 className="history__period">2016~2020</h3>
                <div className="history__info">
                  <ul className="history__list">
                    <li className="history__item">
                      <span className="history__year">2016</span
                      ><span className="history__text"
                        >차세대 RAF 저해제, Roche 제넨텍 기술수출</span
                      >
                    </li>
                    <li className="history__item">
                      <span className="history__year">2017</span
                      ><span className="history__text"
                        >‘에소메졸’ 국내 제약회사 최초 미국약전(USP) 등재</span
                      >
                    </li>
                    <li className="history__item">
                      <span className="history__year">2018</span
                      ><span className="history__text"
                        >‘Glucagon Analog’, ‘오락솔’ 차세대 AML 치료제 美
                        희귀의약품 지정</span
                      >
                    </li>
                    <li className="history__item">
                      <span className="history__year">2019</span
                      ><span className="history__text"
                        >최근 10년간 처방실적 최다 4조 4,176억원</span
                      >
                    </li>
                  </ul>
                  <span className="history__dots" aria-hidden="true"></span>
                </div>
                <figure className="history__media">
                  <img
                    src="./images/obj_his4.png"
                    alt="로수젯 제품과 ASCO, USP 로고"
                    width="934"
                    height="452"
                    loading="lazy"
                  />
                </figure>
              </article>

              {/* 5행 : 2021~2026 */}
              <article className="history__row history__row--l history__row--5">
                <h3 className="history__period">2021~2026</h3>
                <p className="history__lead">
                  하지만 아직, 가야 할 길이 더 남아 있습니다.
                </p>
                <div className="history__info">
                  <ul className="history__list">
                    <li className="history__item">
                      <span className="history__year">2021</span
                      ><span className="history__text"
                        >‘로수젯’, 국내사 개발 처방의약품 매출 1위 달성</span
                      >
                    </li>
                    <li className="history__item">
                      <span className="history__year">2022</span
                      ><span className="history__text"
                        >‘롤론티스’ 한국 최초 FDA 허가 받은 바이오신약 등재<br />‘로수젯
                        RACING 연구’ 세계 최고 권위 의학저널 ‘LANCET’ 등재</span
                      >
                    </li>
                    <li className="history__item">
                      <span className="history__year">2023</span
                      ><span className="history__text"
                        >비만 프로젝트 ‘H.O.P’ 프로젝트 가동</span
                      >
                    </li>
                    <li className="history__item">
                      <span className="history__year">2024</span
                      ><span className="history__text"
                        >근손실 한계 뛰어넘은 신개념 비만 신약 ‘HM17321’
                        발표</span
                      >
                    </li>
                    <li className="history__item">
                      <span className="history__year">2025</span
                      ><span className="history__text"
                        >‘로수젯’ 한국 전문의약품 시장 1위 품목 등록<br />한미약품
                        8년 연속 원외처방 1위<br />미국암연구학회(AACR)서 국내
                        최다 11개 연구 성과 발표<br />한미사이언스 약국화장품
                        ‘EGF크림’ 27만개 완판</span
                      >
                    </li>
                    <li className="history__item">
                      <span className="history__year">2026</span
                      ><span className="history__text"
                        >희귀질환치료제 ‘LAPS-GLP2’ 릴리 기술수출<br />한미
                        ‘완전두유·케어미’ 국제 우수 미각상 수상</span
                      >
                    </li>
                  </ul>
                  <span className="history__dots" aria-hidden="true"></span>
                </div>
                <figure className="history__media">
                  <img
                    src="./images/obj_his5.png"
                    alt="랜싯 200주년 표지와 롤론티스 제품"
                    width="746"
                    height="538"
                    loading="lazy"
                  />
                </figure>
                <img
                  className="history__deco history__deco--mol updown"
                  src="./images/obj_mol_big.png"
                  alt=""
                  aria-hidden="true"
                  width="237"
                  height="293"
                  loading="lazy"
                />
              </article>
            </div>

            {/* 하단 : 100th + 마무리 문구 + 접기 */}
            <div className="history__end">
              <img
                className="history__deco history__deco--cloud"
                src="./images/obj_cloud_blur_medium.png"
                alt=""
                aria-hidden="true"
                width="379"
                height="230"
                loading="lazy"
              />
              <img
                className="history__deco history__deco--char leftright"
                src="./images/obj_con2_char.png"
                alt=""
                aria-hidden="true"
                width="339"
                height="485"
                loading="lazy"
              />
              <p className="history__num100" aria-label="창립 100주년">
                100<span>th</span>
              </p>
              <p className="history__copy1">
                한계를 넘을 때마다, 건강한 미래는 가까워졌습니다. 한계를 넘는
                일, 우리에게는 꽤 익숙하니까.
              </p>
              <p className="history__copy2">
                수많은 도전이 오늘의 한미를 만들었습니다.<br />이제 또 다른
                가능성을 향해 당신과 함께 나아갑니다.
              </p>
            </div>

            {/* 접힌 상태에서 하단을 덮는 흰색 그라데이션 */}
            <div className="history__gradient" aria-hidden="true"></div>
          </div>
          {/* /.history__content */}

          {/* 펼치기 / 접기 버튼 (JS 동작 전에는 숨김) */}
          <div className="history__toggle" hidden>
            <button
              className="history__fold"
              type="button"
              aria-expanded="false"
              aria-controls="history-content"
            >
              <svg viewBox="0 0 12 13" fill="none" aria-hidden="true">
                <path
                  d="M1 6.5l5-5 5 5M1 11.5l5-5 5 5"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="history__fold-text">펼치기</span>
            </button>
          </div>
        </div>
      </section>
);

export default SectionHistory;
