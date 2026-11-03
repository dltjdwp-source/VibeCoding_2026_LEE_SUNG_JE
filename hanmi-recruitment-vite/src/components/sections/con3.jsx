const SectionCon3 = () => (
  <section className="con3" id="con3" aria-labelledby="con3-title">
        <div className="con3__inner">
          <div className="con3__head">
            <h2 className="con3__title" id="con3-title">
              한미에서는 어떤 일을 할까요?
            </h2>
            <p className="con3__sub">
              일의 보람부터 성장의 순간까지, 먼저 경험한 현직자들이 솔직하게
              들려드립니다.
            </p>
          </div>

          {/* 장식 : 로고(제목 왼쪽 위) / 캐릭터(우측 상단) / 약병(좌측 하단, 모바일 제외) */}
          <img
            className="con3__deco con3__logo updown"
            src="./images/con3_logo.png"
            alt=""
            aria-hidden="true"
            width="216"
            height="193"
          />
          <img
            className="con3__deco con3__char leftright"
            src="./images/con3_char.png"
            alt=""
            aria-hidden="true"
            width="560"
            height="458"
          />
          <img
            className="con3__deco con3__bottle updown"
            src="./images/con3_bottle.png"
            alt=""
            aria-hidden="true"
            width="442"
            height="692"
            loading="lazy"
          />

          <ul className="con3__list">
            <li>
              <a className="con3__card" href="#">
                <figure className="con3__photo">
                  <img
                    src="./images/con3_int1.png"
                    alt="실험실에서 주먹을 쥐어 보이는 한미약품 품질관리 이건호 사원"
                    width="1100"
                    height="706"
                    loading="lazy"
                  />
                </figure>
                <p className="con3__desc">
                  정밀한 시험과 분석으로 의약품의 품질을 확인해<br
                    className="con3__br"
                  />
                  안전하고 신뢰할 수 있는 의약품을 만들어갑니다.
                </p>
                <div className="con3__foot">
                  <p className="con3__meta">
                    <span className="con3__dept">한미약품 품질관리</span
                    ><span className="con3__name">이건호 사원</span>
                  </p>
                  <span className="con3__arrow" aria-hidden="true">
                    <svg viewBox="0 0 14 12" fill="none">
                      <path
                        d="M1 6h11M8 1.5L12.5 6 8 10.5"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </div>
              </a>
            </li>
            <li>
              <a className="con3__card" href="#">
                <figure className="con3__photo">
                  <img
                    src="./images/con3_int2.png"
                    alt="소파에 앉아 있는 한미약품 전임상연구 박진하 연구원"
                    width="1100"
                    height="706"
                    loading="lazy"
                  />
                </figure>
                <p className="con3__desc">
                  신약 후보물질의 가능성을 과학적으로 검증해<br
                    className="con3__br"
                  />
                  새로운 치료제가 환자에게 향하는 첫걸음을 만듭니다.
                </p>
                <div className="con3__foot">
                  <p className="con3__meta">
                    <span className="con3__dept">한미약품 전임상연구</span
                    ><span className="con3__name">박진하 연구원</span>
                  </p>
                  <span className="con3__arrow" aria-hidden="true">
                    <svg viewBox="0 0 14 12" fill="none">
                      <path
                        d="M1 6h11M8 1.5L12.5 6 8 10.5"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </div>
              </a>
            </li>
          </ul>

          <p className="con3__more">
            <a className="btn con3__btn" href="#">모든 현직자 알아가기!</a>
          </p>
        </div>
      </section>
);

export default SectionCon3;
