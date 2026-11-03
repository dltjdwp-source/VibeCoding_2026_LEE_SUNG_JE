const SectionMainVisual = () => (
  <section className="mv" id="main-visual" aria-labelledby="mv-title">
        <div className="inner">
          {/* 텍스트 영역 */}
          <div className="mv__content">
            <div className="mv__text">
              <p className="mv__eyebrow">2026년 하반기</p>
              <h1 className="mv__title" id="mv-title">
                <span className="mv__title-em">한미그룹</span>
                <span className="mv__title-sub">공개채용</span>
              </h1>
              <p className="mv__period">
                모집기간 : 2026.9.28(월) ~ 2026.10.18(일) 23:59까지
              </p>
            </div>
            <a className="btn btn--primary" href="#jobs">모집직무 바로가기!</a>
          </div>

          {/* 비주얼 영역 (장식 요소 : 원형 링은 CSS 가상요소) */}
          {/* Container.png : 현미경 / Container-1.png : 파랑 / Container-2.png : 주황 / mv_char3_png.png : 보라 / Container-3.png : 노랑 */}
          <div className="mv__visual" aria-hidden="true">
            <img
              className="mv__img mv__img--micro updown"
              src="./images/Container.png"
              alt=""
            />
            <img
              className="mv__img mv__img--char1 updown"
              src="./images/Container-1.png"
              alt=""
            />
            <img
              className="mv__img mv__img--char2 updown"
              src="./images/Container-2.png"
              alt=""
            />
            <img
              className="mv__img mv__img--char3 updown"
              src="./images/mv_char3_png.png"
              alt=""
            />
            <img
              className="mv__img mv__img--char4 updown"
              src="./images/Container-3.png"
              alt=""
            />

            <svg className="mv__star--1" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="#FFFFFF"
                d="M12 0c.8 7.5 4.5 11.2 12 12-7.5.8-11.2 4.5-12 12-.8-7.5-4.5-11.2-12-12 7.5-.8 11.2-4.5 12-12z"
              />
            </svg>
            <svg className="mv__star--2" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="#A56BFF"
                d="M12 0c.8 7.5 4.5 11.2 12 12-7.5.8-11.2 4.5-12 12-.8-7.5-4.5-11.2-12-12 7.5-.8 11.2-4.5 12-12z"
              />
            </svg>
            <svg className="mv__star--3" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="#FFC928"
                d="M12 0c.8 7.5 4.5 11.2 12 12-7.5.8-11.2 4.5-12 12-.8-7.5-4.5-11.2-12-12 7.5-.8 11.2-4.5 12-12z"
              />
            </svg>
            <svg className="mv__star--4" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="#FF5D32"
                d="M12 0c.8 7.5 4.5 11.2 12 12-7.5.8-11.2 4.5-12 12-.8-7.5-4.5-11.2-12-12 7.5-.8 11.2-4.5 12-12z"
              />
            </svg>
            <svg className="mv__star--5" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="#FFC928"
                d="M12 0c.8 7.5 4.5 11.2 12 12-7.5.8-11.2 4.5-12 12-.8-7.5-4.5-11.2-12-12 7.5-.8 11.2-4.5 12-12z"
              />
            </svg>
          </div>

          {/* 아래로 스크롤 버튼 */}
          <button className="mv__scroll" type="button" aria-label="아래로 스크롤">
            <svg viewBox="0 0 40 40" fill="none" aria-hidden="true">
              <path
                d="M10 15l10 10 10-10"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </section>
);

export default SectionMainVisual;
