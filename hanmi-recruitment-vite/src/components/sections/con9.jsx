const SectionCon9 = () => (
  <section className="con9" aria-labelledby="con9-title">
        <img
          className="con9__cloud con9__cloud--left"
          src="./images/con9_cloud_l.png"
          alt=""
          width="657"
          height="309"
          loading="lazy"
        />
        <img
          className="con9__cloud con9__cloud--right"
          src="./images/con9_cloud_r.png"
          alt=""
          width="450"
          height="383"
          loading="lazy"
        />
        <div className="con9__inner">
          <h2 className="con9__title" id="con9-title">
            당신에게 딱 맞는 자리를 찾으러 출발!
          </h2>
          <p className="con9__timer" data-application-countdown data-deadline="2026-11-03T10:30:00+09:00" aria-live="off">
            <span className="con9__unit"><span className="con9__number" data-countdown-days>3</span> 일</span>
            <span className="con9__unit"><span className="con9__number" data-countdown-hours>17</span> 시간</span>
            <span className="con9__unit"><span className="con9__number" data-countdown-minutes>10</span> 분</span>
            <span className="con9__unit"><span className="con9__number" data-countdown-seconds>28</span> 초 남았어요</span>
          </p>
          <a className="con9__earth-link" href="#jobs" aria-label="채용 직무 바로가기">
            <img
              className="con9__earth"
              src="./images/con9_earth.png"
              alt=""
              width="444"
              height="444"
              loading="lazy"
            />
            <span className="con9__apply">
              지원하기<span className="con8__arrow" aria-hidden="true">→</span>
            </span>
          </a>
          <p className="con9__note">아이콘을 클릭해서 지원해주세요!</p>
        </div>
      </section>
);

export default SectionCon9;
