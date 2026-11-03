const SectionCon4 = () => (
  <section className="con4" id="con4" aria-labelledby="con4-title">
        <div className="con4__inner">
          <div className="con4__head">
            <h2 className="con4__title" id="con4-title">
              당신의 가능성,<br />한미그룹에서 더 크게 성장합니다
            </h2>
            <p className="con4__sub">
              연구와 혁신으로 성장하며 글로벌 제약/바이오 기업을<br
                className="con4__br-m"
              />
              향해 나아갑니다.
            </p>
          </div>

          {/* 장식 이미지 (분자 구조는 섹션 하단 기준) */}
          <img
            className="con4__deco con4__mol updown"
            src="./images/inno_chemical2.png"
            alt=""
            aria-hidden="true"
            width="359"
            height="359"
            loading="lazy"
          />

          <div className="con4__panel">
            <img
              className="con4__deco con4__formula"
              src="./images/inno_chemical1.png"
              alt=""
              aria-hidden="true"
              width="702"
              height="208"
              loading="lazy"
            />
            <img
              className="con4__deco con4__atom bigsmall"
              src="./images/inno_chemical3.png"
              alt=""
              aria-hidden="true"
              width="359"
              height="383"
              loading="lazy"
            />
            <ul className="con4__list">
              {/* 왼쪽(주황) / 오른쪽(흰색) 말풍선 교차 : con4__item--l / con4__item--r */}
              <li className="con4__item con4__item--l">
                <a className="con4__bubble" href="#">
                  <span className="con4__bg" aria-hidden="true">
                    <svg
                      className="con4__body"
                      width="100%"
                      height="100%"
                      focusable="false"
                    >
                      <rect width="100%" height="100%" rx="7" ry="7" />
                    </svg>
                    <svg
                      className="con4__tail"
                      viewBox="0 0 12 9"
                      focusable="false"
                    >
                      <path
                        d="M12 0V9H2.2C.6 9-.3 7.7.9 6.6 4.2 3.6 5.8 2.5 6.4 0Z"
                      />
                    </svg>
                  </span>
                  <span className="con4__txt"
                    >한미약품, 상반기 누적 매출 8,602억원…2분기 영업이익 117%
                    증가</span
                  >
                </a>
              </li>
              <li className="con4__item con4__item--r">
                <a className="con4__bubble" href="#">
                  <span className="con4__bg" aria-hidden="true">
                    <svg
                      className="con4__body"
                      width="100%"
                      height="100%"
                      focusable="false"
                    >
                      <rect width="100%" height="100%" rx="7" ry="7" />
                    </svg>
                    <svg
                      className="con4__tail"
                      viewBox="0 0 12 9"
                      focusable="false"
                    >
                      <path
                        d="M12 0V9H2.2C.6 9-.3 7.7.9 6.6 4.2 3.6 5.8 2.5 6.4 0Z"
                      />
                    </svg>
                  </span>
                  <span className="con4__txt"
                    >“사업형 지주사 경쟁력 입증”…한미사이언스, 2분기 영업이익
                    71%↑<br />2분기 매출 3,679억원…상반기 누적 매출 7,216억원
                    돌파</span
                  >
                </a>
              </li>
              <li className="con4__item con4__item--l">
                <a className="con4__bubble" href="#">
                  <span className="con4__bg" aria-hidden="true">
                    <svg
                      className="con4__body"
                      width="100%"
                      height="100%"
                      focusable="false"
                    >
                      <rect width="100%" height="100%" rx="7" ry="7" />
                    </svg>
                    <svg
                      className="con4__tail"
                      viewBox="0 0 12 9"
                      focusable="false"
                    >
                      <path
                        d="M12 0V9H2.2C.6 9-.3 7.7.9 6.6 4.2 3.6 5.8 2.5 6.4 0Z"
                      />
                    </svg>
                  </span>
                  <span className="con4__txt"
                    >한미약품, 로슈 제넨텍에 비만신약 기술수출…최대 3조 2,000억
                    규모</span
                  >
                </a>
              </li>
              <li className="con4__item con4__item--r">
                <a className="con4__bubble" href="#">
                  <span className="con4__bg" aria-hidden="true">
                    <svg
                      className="con4__body"
                      width="100%"
                      height="100%"
                      focusable="false"
                    >
                      <rect width="100%" height="100%" rx="7" ry="7" />
                    </svg>
                    <svg
                      className="con4__tail"
                      viewBox="0 0 12 9"
                      focusable="false"
                    >
                      <path
                        d="M12 0V9H2.2C.6 9-.3 7.7.9 6.6 4.2 3.6 5.8 2.5 6.4 0Z"
                      />
                    </svg>
                  </span>
                  <span className="con4__txt"
                    >“UCN2 이어 또…” 한미약품, 두 번째 근육 증가 비만신약
                    공개</span
                  >
                </a>
              </li>
              <li className="con4__item con4__item--l">
                <a className="con4__bubble" href="#">
                  <span className="con4__bg" aria-hidden="true">
                    <svg
                      className="con4__body"
                      width="100%"
                      height="100%"
                      focusable="false"
                    >
                      <rect width="100%" height="100%" rx="7" ry="7" />
                    </svg>
                    <svg
                      className="con4__tail"
                      viewBox="0 0 12 9"
                      focusable="false"
                    >
                      <path
                        d="M12 0V9H2.2C.6 9-.3 7.7.9 6.6 4.2 3.6 5.8 2.5 6.4 0Z"
                      />
                    </svg>
                  </span>
                  <span className="con4__txt"
                    >명품 반열 오른 한미 ‘로수젯’…압도적 데이터 경쟁력으로 시장
                    석권<br />2년 연속 국내사 개발 전문의약품 시장 ‘1위’…올해
                    상반기 누적 처방액도 선두</span
                  >
                </a>
              </li>
              <li className="con4__item con4__item--r">
                <a className="con4__bubble" href="#">
                  <span className="con4__bg" aria-hidden="true">
                    <svg
                      className="con4__body"
                      width="100%"
                      height="100%"
                      focusable="false"
                    >
                      <rect width="100%" height="100%" rx="7" ry="7" />
                    </svg>
                    <svg
                      className="con4__tail"
                      viewBox="0 0 12 9"
                      focusable="false"
                    >
                      <path
                        d="M12 0V9H2.2C.6 9-.3 7.7.9 6.6 4.2 3.6 5.8 2.5 6.4 0Z"
                      />
                    </svg>
                  </span>
                  <span className="con4__txt"
                    >“비만 넘어 항암으로 혁신 확장”…한미, AACR서 차세대 신약
                    대거 공개</span
                  >
                </a>
              </li>
              <li className="con4__item con4__item--l">
                <a className="con4__bubble" href="#">
                  <span className="con4__bg" aria-hidden="true">
                    <svg
                      className="con4__body"
                      width="100%"
                      height="100%"
                      focusable="false"
                    >
                      <rect width="100%" height="100%" rx="7" ry="7" />
                    </svg>
                    <svg
                      className="con4__tail"
                      viewBox="0 0 12 9"
                      focusable="false"
                    >
                      <path
                        d="M12 0V9H2.2C.6 9-.3 7.7.9 6.6 4.2 3.6 5.8 2.5 6.4 0Z"
                      />
                    </svg>
                  </span>
                  <span className="con4__txt"
                    >한미 완전두유·케어미, 영양에 ‘맛’까지 인정…국제 우수 미각상
                    수상</span
                  >
                </a>
              </li>
            </ul>

            <p className="con4__note"> · 말풍선을 클릭해서 기사를 확인해 보세요.</p>
          </div>
        </div>
      </section>
);

export default SectionCon4;
