import usePublicJson from '../hooks/usePublicJson.js'

function isBenefitsData(data) {
  return (
    Array.isArray(data) &&
    data.length > 0 &&
    data.every(
      (category) =>
        typeof category.category === 'string' &&
        typeof category.category_description === 'string' &&
        Array.isArray(category.items) &&
        category.items.every(
          (item) =>
            typeof item.title === 'string' &&
            typeof item.description === 'string',
        ),
    )
  )
}

function BenefitsList() {
  const { data, error, loading } = usePublicJson(
    'data/benefit_data.json',
    isBenefitsData,
  )

  if (loading) {
    return (
      <li className="con5__error" role="status">
        복지 목록을 불러오는 중입니다.
      </li>
    )
  }

  if (error) {
    return (
      <li className="con5__error" role="alert">
        복지 목록을 불러오지 못했습니다. 잠시 후 다시 확인해 주세요.
      </li>
    )
  }

  return data.flatMap((category, categoryIndex) => {
    const iconOffset = data
      .slice(0, categoryIndex)
      .reduce((count, previousCategory) => count + previousCategory.items.length, 0)

    return [
      <li className="con5__section" key={`category-${categoryIndex}`}>
        <div className="con5__lead">
          <h3 className="con5__lead-main">
            <img
              className="con5__heart"
              src="./images/wf_tit1.png"
              alt=""
              width="24"
              height="22"
              loading="lazy"
            />
            <span>{category.category}</span>
          </h3>
          <p className="con5__lead-sub">{category.category_description}</p>
        </div>
      </li>,
      ...category.items.map((item, itemIndex) => (
        <li className="con5__card" key={`benefit-${categoryIndex}-${itemIndex}`}>
          <div className="con5__txt">
            <h3 className="con5__name">{item.title}</h3>
            <p className="con5__desc">{item.description}</p>
          </div>
          <img
            className="con5__ico"
            src={`./images/wf_ico${iconOffset + itemIndex + 1}.png`}
            alt=""
            width="72"
            height="72"
            loading="lazy"
          />
        </li>
      )),
    ]
  })
}

export default BenefitsList
