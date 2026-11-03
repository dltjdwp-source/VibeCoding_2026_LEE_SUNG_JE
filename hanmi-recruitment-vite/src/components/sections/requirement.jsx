const SectionRequirement = () => (
  <section
        className="requirement"
        id="requirement"
        aria-labelledby="requirement-title"
      >
        <div className="requirement__inner">
          <h2 className="requirement__title" id="requirement-title">
            한미그룹과 함께하는 문은<br />활짝 열려 있습니다
          </h2>
          <img
            className="requirement__bulb updown"
            src="./images/require_obj_bulb.png"
            alt=""
            width="360"
            height="456"
            loading="lazy"
          />
          <div className="requirement__tabs-wrap">
            <div className="requirement__tabs" role="tablist" aria-label="채용 안내">
              <button
                className="requirement__tab"
                id="requirement-tab-eligibility"
                type="button"
                role="tab"
                aria-selected="true"
                aria-controls="requirement-panel-eligibility"
                tabIndex="0"
              >
                지원자격
              </button>
              <button
                className="requirement__tab"
                id="requirement-tab-process"
                type="button"
                role="tab"
                aria-selected="false"
                aria-controls="requirement-panel-process"
                tabIndex="-1"
              >
                전형절차 및 접수방법
              </button>
            </div>
          </div>
          <div
            className="requirement__panel"
            id="requirement-panel-eligibility"
            role="tabpanel"
            aria-labelledby="requirement-tab-eligibility"
            tabIndex="0"
          >
            <div className="requirement__eligibility">
              <div className="requirement__item">
                <img
                  className="requirement__item-icon"
                  src="./images/require_ico_calendar_3d.png"
                  alt=""
                  width="169"
                  height="200"
                  loading="lazy"
                />
                <h3 className="requirement__item-title">27년 1월 입사가 가능한 자</h3>
              </div>
              <div className="requirement__item">
                <img
                  className="requirement__item-icon"
                  src="./images/require_ico_gradcap_3d.png"
                  alt=""
                  width="244"
                  height="200"
                  loading="lazy"
                />
                <h3 className="requirement__item-title">
                  기졸업자 또는 27년 2월 졸업 예정자
                </h3>
              </div>
            </div>
            <div className="requirement__conditions">
              <ul className="requirement__condition-list">
                <li>남성의 경우 병역을 마쳤거나 면제인 분</li>
                <li>해외여행 (또는 해외 출장)에 결격사유가 없는 분</li>
                <li>취업보호대상자는 관련 법령에 의거하여 우대</li>
              </ul>
            </div>
            <p className="requirement__notice">
              모집 직무별로 지원자격이 상이하오니 반드시
              <span className="requirement__notice-em">채용 공고</span>를 확인해 주시기 바랍니다.
            </p>
          </div>
          <div
            className="requirement__panel"
            id="requirement-panel-process"
            role="tabpanel"
            aria-labelledby="requirement-tab-process"
            tabIndex="0"
            hidden
          >
            <div className="requirement__process">
              <section className="requirement__track" aria-labelledby="requirement-sales-title">
                <h3 className="requirement__track-title" id="requirement-sales-title">
                  영업직군
                </h3>
                <ol className="requirement__steps">
                  <li className="requirement__step">
                    <span className="requirement__step-icon" aria-hidden="true">🗓️</span>
                    <h4 className="requirement__step-title">지원접수</h4>
                    <p className="requirement__step-date">9.28~10.18</p>
                  </li>
                  <li className="requirement__step">
                    <span className="requirement__step-icon" aria-hidden="true">📑</span>
                    <h4 className="requirement__step-title">서류전형</h4>
                    <p className="requirement__step-date">10.19~10.20</p>
                  </li>
                  <li className="requirement__step">
                    <span className="requirement__step-icon" aria-hidden="true">🔍</span>
                    <h4 className="requirement__step-title">AI역량검사</h4>
                    <p className="requirement__step-date">10.21~10.25</p>
                  </li>
                  <li className="requirement__step">
                    <span className="requirement__step-icon" aria-hidden="true">🪪</span>
                    <h4 className="requirement__step-title">1차면접</h4>
                    <p className="requirement__step-date">11월 중</p>
                  </li>
                  <li className="requirement__step">
                    <span className="requirement__step-icon" aria-hidden="true">📍</span>
                    <h4 className="requirement__step-title">현장체험</h4>
                    <p className="requirement__step-date">12월 초</p>
                  </li>
                  <li className="requirement__step">
                    <span className="requirement__step-icon" aria-hidden="true">💬</span>
                    <h4 className="requirement__step-title">2차면접</h4>
                    <p className="requirement__step-date">12월 중</p>
                  </li>
                  <li className="requirement__step">
                    <span className="requirement__step-icon" aria-hidden="true">📚</span>
                    <h4 className="requirement__step-title">교육전형</h4>
                    <p className="requirement__step-date">27.1.4~</p>
                  </li>
                </ol>
              </section>
              <section className="requirement__track" aria-labelledby="requirement-other-title">
                <h3 className="requirement__track-title" id="requirement-other-title">
                  영업 외 전직군
                </h3>
                <ol className="requirement__steps">
                  <li className="requirement__step">
                    <span className="requirement__step-icon" aria-hidden="true">🗓️</span>
                    <h4 className="requirement__step-title">지원접수</h4>
                    <p className="requirement__step-date">9.28~10.18</p>
                  </li>
                  <li className="requirement__step">
                    <span className="requirement__step-icon" aria-hidden="true">📑</span>
                    <h4 className="requirement__step-title">서류전형</h4>
                    <p className="requirement__step-date">10.19~10.20</p>
                  </li>
                  <li className="requirement__step">
                    <span className="requirement__step-icon" aria-hidden="true">🔍</span>
                    <h4 className="requirement__step-title">AI역량검사</h4>
                    <p className="requirement__step-date">10.21~10.25</p>
                  </li>
                  <li className="requirement__step">
                    <span className="requirement__step-icon" aria-hidden="true">🪪</span>
                    <h4 className="requirement__step-title">1차면접</h4>
                    <p className="requirement__step-date">11월 중</p>
                  </li>
                  <li className="requirement__step">
                    <span className="requirement__step-icon" aria-hidden="true">💬</span>
                    <h4 className="requirement__step-title">2차면접</h4>
                    <p className="requirement__step-date">12월 중</p>
                  </li>
                  <li className="requirement__step">
                    <span className="requirement__step-icon" aria-hidden="true">🏢</span>
                    <h4 className="requirement__step-title">입사</h4>
                    <p className="requirement__step-date">27.1.4<br />(경력직 협의 가능)</p>
                  </li>
                </ol>
              </section>
            </div>
            <div className="requirement__process-notes">
              <ul className="requirement__process-note-list">
                <li>상기 일정은 상황에 따라 변경될 수 있으며 각 전형별 상세 일정은 대상자에 한해 개별 안내 예정입니다.</li>
                <li>입사지원서에 허위 기재가 있거나 제출서류가 허위로 판명되는 경우, 또는 입사 이후 자격 미확보 및 상실하는 경우는 입사가 취소될 수 있습니다.</li>
                <li>지원서 제출 후에는 수정이 절대 불가하오니, 주의하시기 바랍니다.</li>
                <li>전형단계별 결과는 E-Mail 및 SMS를 통하여 안내하오니 E-Mail 주소 및 휴대전화 번호를 정확히 기재해주시기 바랍니다.</li>
                <li>입사 후 3개월간 수습기간이 적용되며, 수습 기간 중 성적이 불량하거나 직무 수행 능력이 부족하다고 판단되는 경우 입사가 취소될 수 있습니다.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
);

export default SectionRequirement;
