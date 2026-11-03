import JobBrowser from '../JobBrowser.jsx'

const SectionJobs = () => (
  <section className="tasks" id="jobs" aria-labelledby="tasks-title">
    <div className="tasks__hero" aria-hidden="true">
      <img
        className="tasks__watermark"
        src="./images/tasks_bg_title.png"
        alt=""
        width="2880"
        height="720"
      />
      <div
        className="tasks__character hanmi-walker"
        data-hanmi-walker
        data-hanmi-player="reading"
      >
        <canvas
          width="1920"
          height="1080"
          role="img"
          aria-label="마우스를 바라보며 돋보기를 든 캐릭터"
        ></canvas>
        <span data-status role="status">
          이미지 준비 중
        </span>
      </div>
    </div>
    <div className="tasks__inner">
      <div className="tasks__head">
        <h2 className="tasks__title" id="tasks-title">
          알약이를 따라
          <br />
          나에게 맞는 직무를 찾아봐요!
        </h2>
        <p className="tasks__description">
          연구부터 생산, 영업, 경영지원까지 당신의 가능성이 빛날 자리를 안내해
          드릴게요.
        </p>
      </div>
      <JobBrowser />
    </div>
  </section>
)

export default SectionJobs
