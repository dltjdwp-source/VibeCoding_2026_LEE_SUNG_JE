import RecruitingSchedule from '../RecruitingSchedule.jsx'

const SectionExposition = () => (
  <section
    className="exposition"
    id="exposition"
    aria-labelledby="exposition-title"
  >
    <div className="exposition__inner">
      <div className="exposition__intro">
        <img
          className="exposition__character updown"
          src="./images/expo_char.png"
          alt=""
          width="698"
          height="604"
          loading="lazy"
        />
        <div className="exposition__copy">
          <h2 className="exposition__title" id="exposition-title">
            Hanmi 박람회/캠퍼스로 출발!
          </h2>
          <p className="exposition__description">
            한미그룹이 여러분을 만나러 박람회와 캠퍼스로 찾아갑니다.
            <br />
            우리가 어디서 만날지 궁금하다면 아래 지역에서 찾아보세요!
          </p>
          <p className="exposition__hint">
            학교명/장소를 클릭하거나 터치하면 세부장소를 확인하실 수 있습니다.
          </p>
        </div>
      </div>
      <RecruitingSchedule />
    </div>
  </section>
)

export default SectionExposition
