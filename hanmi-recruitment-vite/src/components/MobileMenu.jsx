const MobileMenu = () => (
  <div className="mnav" id="mobile-menu">
      <div className="mnav__overlay" data-mnav-close></div>
      <div
        className="mnav__panel"
        role="dialog"
        aria-modal="true"
        aria-label="전체 메뉴"
      >
        <div className="mnav__head">
          <a className="mnav__logo" href="#" aria-label="한미그룹 홈">
            <img
              src="./images/logo_svg.svg"
              alt="Hanmi 한미그룹"
              width="100"
              height="17"
            />
          </a>
          <button className="mnav__close" type="button" aria-label="전체 메뉴 닫기">
            <svg viewBox="0 0 15 15" fill="none" aria-hidden="true">
              <path
                d="M1 1l13 13M14 1L1 14"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <nav aria-label="전체 메뉴">
          <ul className="mnav__list">
            <li><a className="mnav__link" href="#jobs">직무소개</a></li>
            <li>
              <a className="mnav__link" href="#requirement"
                >지원자격 및 접수방법</a
              >
            </li>
            <li><a className="mnav__link" href="#exposition">채용설명회 일정</a></li>
          </ul>
        </nav>

        <a className="btn btn--apply mnav__apply" href="#apply">
          <span>지원하기</span>
          <svg
            className="ico-chevron-right"
            viewBox="0 0 7 12"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M1 1l5 5-5 5"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>

        <img
          className="mnav__char"
          src="./images/mo_menu_char.png"
          alt=""
          width="128"
          height="131"
        />
      </div>
    </div>
);

export default MobileMenu;
