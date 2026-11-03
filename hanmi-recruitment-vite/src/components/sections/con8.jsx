const SectionCon8 = () => (
  <section className="con8" aria-label="한미그룹 지원 링크">
        <div className="con8__inner">
          <img
            className="con8__character updown"
            src="./images/con8_char.png"
            alt=""
            width="281"
            height="357"
            loading="lazy"
          />
          <div className="con8__cards">
            <a
              className="con8__card"
              href="https://www.youtube.com/results?search_query=%ED%95%9C%EB%AF%B8%EA%B7%B8%EB%A3%B9"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="con8__image-wrap">
                <img
                  className="con8__image"
                  src="./images/con8_img1.jpg"
                  alt=""
                  width="774"
                  height="1000"
                  loading="lazy"
                />
              </span>
              <span className="con8__card-copy">
                <span className="con8__card-title">
                  한미그룹의
                  <span className="con8__marked-word">
                    문화와 복지가 
                    <img className="con8__doodle con8__doodle--four" src="./images/con8_Image-1.png" alt="" />
                  </span>
                  궁금하다면?
                </span>
                <img className="con8__doodle con8__doodle--one" src="./images/con8_Image.png" alt="" />
                <img className="con8__doodle con8__doodle--two" src="./images/con8_Image-2.png" alt="" />
                <span className="con8__card-link">
                  한미그룹 YouTube<span className="con8__arrow" aria-hidden="true">→</span>
                </span>
              </span>
            </a>
            <a className="con8__card" href="#jobs">
              <span className="con8__image-wrap">
                <img
                  className="con8__image"
                  src="./images/con8_img2.jpg"
                  alt=""
                  width="774"
                  height="1000"
                  loading="lazy"
                />
              </span>
              <span className="con8__card-copy">
                <span className="con8__card-title">
                  한미그룹의
                  <span className="con8__marked-word">
                    직무가
                    <img className="con8__doodle con8__doodle--three" src="./images/con8_Image-3.png" alt="" />
                  </span>
                  궁금하다면?
                </span>
                <img className="con8__doodle con8__doodle--one" src="./images/con8_Image-4.png" alt="" />
                <span className="con8__card-link">
                  한미그룹 직무 소개 페이지<span className="con8__arrow" aria-hidden="true">→</span>
                </span>
              </span>
            </a>
            <a className="con8__card" href="./index.html">
              <span className="con8__image-wrap">
                <img
                  className="con8__image"
                  src="./images/con8_img3.jpg"
                  alt=""
                  width="774"
                  height="1000"
                  loading="lazy"
                />
              </span>
              <span className="con8__card-copy">
                <span className="con8__card-title">
                  한미그룹의
                  <span className="con8__marked-word">
                    채용소식을
                    <img className="con8__doodle con8__doodle--five" src="./images/con8_Image-5.png" alt="" />
                  </span>
                  빠르게 받고 싶다면?
                </span>
                <span className="con8__card-link">
                  한미그룹 채용 홈페이지<span className="con8__arrow" aria-hidden="true">→</span>
                </span>
              </span>
            </a>
          </div>
        </div>
      </section>
);

export default SectionCon8;
