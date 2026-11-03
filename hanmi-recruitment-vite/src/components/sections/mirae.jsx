const SectionMirae = () => (
  <section className="mirae" id="mirae" aria-labelledby="mirae-title">
        <h2 className="mirae__title" id="mirae-title">
          <span className="mirae__title-em">새로운 미래</span>를 향해 나아갑니다
        </h2>

        {/* 구름 (블러 2개 + 좌우 끝 2개) */}
        <img
          className="mirae__deco mirae__cloud mirae__cloud--blur1"
          src="./images/mirae_cloud3.png"
          alt=""
          aria-hidden="true"
          width="866"
          height="460"
          loading="lazy"
        />
        <img
          className="mirae__deco mirae__cloud mirae__cloud--blur2"
          src="./images/mirae_cloud4.png"
          alt=""
          aria-hidden="true"
          width="378"
          height="200"
          loading="lazy"
        />
        <img
          className="mirae__deco mirae__cloud mirae__cloud--l"
          src="./images/mirae_cloud1.png"
          alt=""
          aria-hidden="true"
          width="422"
          height="320"
          loading="lazy"
        />
        <img
          className="mirae__deco mirae__cloud mirae__cloud--r"
          src="./images/mirae_cloud2.png"
          alt=""
          aria-hidden="true"
          width="700"
          height="520"
          loading="lazy"
        />

        {/* 산 위를 걷는 캐릭터 */}
        <div
          className="mirae__deco mirae__walking hanmi-walker"
          data-hanmi-walker
          data-hanmi-player="walking"
        >
          <canvas
            width="1920"
            height="1080"
            role="img"
            aria-label="마우스를 바라보며 걷는 캐릭터"
          ></canvas>
          <span data-status role="status">이미지 준비 중</span>
        </div>

        {/* 별 */}
        <img
          className="mirae__deco mirae__star mirae__star--1"
          src="./images/mirae_star1.png"
          alt=""
          aria-hidden="true"
          width="40"
          height="42"
          loading="lazy"
        />
        <img
          className="mirae__deco mirae__star mirae__star--2"
          src="./images/mirae_star2.png"
          alt=""
          aria-hidden="true"
          width="125"
          height="126"
          loading="lazy"
        />
      </section>
);

export default SectionMirae;
