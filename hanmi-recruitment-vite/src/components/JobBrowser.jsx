import { useEffect, useRef, useState } from 'react'
import usePublicJson from '../hooks/usePublicJson.js'

const categories = [
  { id: 'rnd', label: 'R&D' },
  { id: 'prod', label: '생산/품질' },
  { id: 'sales', label: '영업' },
  { id: 'mps', label: '경영관리' },
  { id: 'cl', label: '임상' },
  { id: 'global', label: '글로벌' },
  { id: 'healthcare', label: '헬스케어' },
]

function isTaskData(data) {
  return (
    Array.isArray(data) &&
    data.every(
      (category) =>
        typeof category.category === 'string' &&
        Array.isArray(category.details) &&
        category.details.every(
          (detail) =>
            typeof detail.location === 'string' &&
            typeof detail.count === 'string' &&
            Array.isArray(detail.fields) &&
            detail.fields.every((field) => typeof field === 'string'),
        ),
    )
  )
}

function isJobData(data) {
  return (
    Array.isArray(data) &&
    data.every(
      (job) =>
        typeof job.title === 'string' &&
        typeof job.department === 'string' &&
        typeof job.location === 'string' &&
        typeof job.category === 'string' &&
        Array.isArray(job.job_description) &&
        Array.isArray(job.qualifications) &&
        Array.isArray(job.preferred),
    )
  )
}

function ArrowIcon({ className, direction }) {
  const path =
    direction === 'down' ? 'm5 7 5 5 5-5' : 'M3 10h13m-5-5 5 5-5 5'

  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d={path}
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function JobBrowser() {
  const [activeCategory, setActiveCategory] = useState('rnd')
  const [expandedGroup, setExpandedGroup] = useState(null)
  const [selectedJob, setSelectedJob] = useState(null)
  const [selectionError, setSelectionError] = useState('')
  const tabRefs = useRef([])
  const dialogRef = useRef(null)
  const returnFocusRef = useRef(null)
  const taskData = usePublicJson('data/task_data.json', isTaskData)
  const jobData = usePublicJson('data/pop_data.json', isJobData)

  useEffect(() => {
    if (selectedJob && dialogRef.current && !dialogRef.current.open) {
      dialogRef.current.showModal()
    }
  }, [selectedJob])

  const currentCategory = categories.find(
    (category) => category.id === activeCategory,
  )
  const currentGroups =
    taskData.data?.find((category) => category.category === activeCategory)
      ?.details ?? []

  function activateCategory(index) {
    const category = categories[index]
    setActiveCategory(category.id)
    setExpandedGroup(null)
    tabRefs.current[index]?.focus()
  }

  function openJob(title) {
    const job = jobData.data?.find(
      (record) =>
        record.title === title &&
        record.department === currentCategory.label,
    )

    if (!job) {
      const error = new Error(
        `직무 상세 정보를 찾을 수 없습니다: ${currentCategory.label} / ${title}`,
      )
      console.error('직무 상세 모달을 열지 못했습니다.', error)
      setSelectionError('선택한 직무 상세 정보를 찾을 수 없습니다.')
      return
    }

    setSelectionError('')
    returnFocusRef.current = document.activeElement
    setSelectedJob(job)
  }

  function closeJob() {
    if (dialogRef.current?.open) dialogRef.current.close()
  }

  function handleDialogClose() {
    setSelectedJob(null)
    returnFocusRef.current?.focus()
  }

  const loading = taskData.loading || jobData.loading
  const error = taskData.error || jobData.error

  return (
    <>
      <div className="tasks__tabs-wrap">
        <div className="tasks__tabs" role="tablist" aria-label="직무 분야">
          {categories.map((category, index) => (
            <button
              className="tasks__tab"
              id={`tasks-tab-${category.id}`}
              key={category.id}
              ref={(element) => {
                tabRefs.current[index] = element
              }}
              type="button"
              role="tab"
              aria-selected={activeCategory === category.id}
              aria-controls="tasks-groups"
              tabIndex={activeCategory === category.id ? 0 : -1}
              onClick={() => {
                setActiveCategory(category.id)
                setExpandedGroup(null)
              }}
              onKeyDown={(event) => {
                let nextIndex = index
                if (event.key === 'ArrowRight') {
                  nextIndex = (index + 1) % categories.length
                } else if (event.key === 'ArrowLeft') {
                  nextIndex = (index - 1 + categories.length) % categories.length
                } else if (event.key === 'Home') {
                  nextIndex = 0
                } else if (event.key === 'End') {
                  nextIndex = categories.length - 1
                } else {
                  return
                }
                event.preventDefault()
                activateCategory(nextIndex)
              }}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      <div
        className="tasks__groups"
        id="tasks-groups"
        role="tabpanel"
        aria-labelledby={`tasks-tab-${activeCategory}`}
        tabIndex="0"
      >
        {loading && <p role="status">직무 정보를 불러오는 중입니다.</p>}
        {error && (
          <p role="alert">
            직무 정보를 불러오지 못했습니다. 잠시 후 다시 확인해 주세요.
          </p>
        )}
        {selectionError && <p role="alert">{selectionError}</p>}
        {!loading &&
          !error &&
          currentGroups.map((group, groupIndex) => {
            const isOpen = expandedGroup === groupIndex
            const groupId = `tasks-group-${activeCategory}-${groupIndex}`

            return (
              <section
                className={`tasks__group${isOpen ? ' is-open' : ''}`}
                key={`${group.location}-${groupIndex}`}
              >
                <button
                  className="tasks__group-trigger"
                  id={`${groupId}-trigger`}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`${groupId}-cards`}
                  onClick={() =>
                    setExpandedGroup(isOpen ? null : groupIndex)
                  }
                >
                  <span className="tasks__group-title">{group.location}</span>
                  <span className="tasks__count" aria-label={`${group.count}개 직무`}>
                    {group.count}
                  </span>
                  <ArrowIcon className="tasks__chevron" direction="down" />
                </button>
                <div
                  className={`tasks__panel${isOpen ? ' is-open' : ''}`}
                  id={`${groupId}-cards`}
                  aria-hidden={!isOpen}
                  inert={!isOpen}
                >
                  <div className="tasks__panel-inner">
                    <div className="tasks__cards">
                      {group.fields.map((field) => (
                        <button
                          className="tasks__card"
                          key={field}
                          type="button"
                          onClick={() => openJob(field)}
                        >
                          <span>{field}</span>
                          <ArrowIcon
                            className="tasks__card-arrow"
                            direction="right"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            )
          })}
      </div>

      <dialog
        className="tasks__modal"
        ref={dialogRef}
        aria-labelledby="tasks-modal-title"
        onClick={(event) => {
          if (event.target === event.currentTarget) closeJob()
        }}
        onClose={handleDialogClose}
      >
        {selectedJob && (
          <>
            <div
              className="tasks__modal-banner"
              style={{ backgroundImage: `url("${selectedJob.image}")` }}
            >
              <button
                className="tasks__modal-close"
                type="button"
                aria-label="상세 정보 닫기"
                onClick={closeJob}
              >
                <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path
                    d="M2 2l12 12M14 2L2 14"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
            <div className="tasks__modal-body">
              <div className="tasks__modal-heading">
                <h2 className="tasks__modal-title" id="tasks-modal-title">
                  {selectedJob.title}
                </h2>
                <p className="tasks__modal-meta">
                  <strong>{selectedJob.department}</strong>
                  <span> | {selectedJob.location}</span>
                </p>
              </div>
              <p className="tasks__modal-category">{selectedJob.category}</p>
              {[
                ['직무 내용', 'tasks-duty-title', selectedJob.job_description],
                ['자격요건', 'tasks-qualification-title', selectedJob.qualifications],
                ['우대사항', 'tasks-preferred-title', selectedJob.preferred],
              ].map(([title, id, entries]) => (
                <section
                  className="tasks__detail-section"
                  aria-labelledby={id}
                  key={id}
                  hidden={entries.length === 0}
                >
                  <h3 className="tasks__detail-heading" id={id}>
                    {title}
                  </h3>
                  <ul className="tasks__detail-list">
                    {entries.map((entry) => (
                      <li key={entry}>{entry}</li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          </>
        )}
      </dialog>
    </>
  )
}

export default JobBrowser
