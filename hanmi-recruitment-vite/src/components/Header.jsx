const Header = () => (
  <header>
      <div className="inner">
        <a className="logo" href="#" aria-label="한미그룹 홈">
          <img
            src="./images/logo_svg.svg"
            alt="Hanmi 한미그룹"
            width="182"
            height="31"
          />
        </a>

        <nav className="gnb" aria-label="주요 메뉴">
          <ul className="gnb__list">
            <li className="gnb__item">
              <a className="gnb__link" href="#jobs">직무소개</a>
            </li>
            <li className="gnb__item">
              <a className="gnb__link" href="#requirement"
                >지원자격 및 접수방법</a
              >
            </li>
            <li className="gnb__item">
              <a className="gnb__link" href="#exposition">채용설명회 일정</a>
            </li>
            <li className="gnb__item gnb__item--cta">
              <a className="btn btn--apply" href="#apply">
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
            </li>
          </ul>
        </nav>

        {/* 모바일 햄버거 버튼 (767px 이하에서만 표시) */}
        <button
          className="hamburger"
          type="button"
          aria-label="전체 메뉴 열기"
          aria-expanded="false"
          aria-controls="mobile-menu"
          aria-haspopup="dialog"
        >
          <svg viewBox="0 0 20 15" fill="none" aria-hidden="true">
            <path
              d="M0 1h20M0 7.5h20M0 14h20"
              stroke="currentColor"
              strokeWidth="1.6"
            />
          </svg>
        </button>
      </div>
    </header>
);

export default Header;
