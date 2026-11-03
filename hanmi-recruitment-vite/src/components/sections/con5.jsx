import BenefitsList from '../BenefitsList.jsx'

const SectionCon5 = () => (
  <section className="con5" id="con5" aria-labelledby="con5-title">
        <div className="con5__inner">
          <div className="con5__head">
            <h2 className="con5__title" id="con5-title">
              한미 생활을<br className="con5__br-m" />
              더 즐겁게 만드는 방법
            </h2>
            <p className="con5__sub">
              건강부터 성장, 휴식까지 알차게 준비한 복지를 소개할게요.
            </p>
          </div>

          {/* 장식 : 주황 캐릭터(우측 상단) / 보라 캐릭터(좌측 하단, 섹션 바닥에 붙음) */}
          <img
            className="con5__deco con5__char updown"
            src="./images/con5_char.png"
            alt=""
            aria-hidden="true"
            width="413"
            height="420"
          />
          <img
            className="con5__deco con5__mascot"
            src="./images/con5_cloud.png"
            alt=""
            aria-hidden="true"
            width="335"
            height="209"
            loading="lazy"
          />

          <div className="con5__panel">
            {/* 세로 스크롤 영역 : 복지 데이터 JSON에서 카테고리와 카드 생성 */}
            <div
              className="con5__scroll"
              tabIndex="0"
              role="region"
              aria-label="한미 복지 목록"
            >
              <ul className="con5__list" aria-live="polite">
                <BenefitsList />
              </ul>
            </div>
          </div>
        </div>
      </section>
);

export default SectionCon5;
