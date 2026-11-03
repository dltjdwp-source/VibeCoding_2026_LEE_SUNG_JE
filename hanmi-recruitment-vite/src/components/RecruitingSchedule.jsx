import { useEffect, useRef, useState } from 'react'
import usePublicJson from '../hooks/usePublicJson.js'

const fairSchedule = [
  { date: '8월 31일 (월)', events: ['KAIST'] },
  { date: '9월 1일 (화)', events: ['서울대학교', '서강대학교', '연세대학교'] },
  { date: '9월 2일 (수)', events: ['UNIST', '한양대학교'] },
  { date: '9월 3일 (목)', events: ['GIST'] },
  { date: '9월 4일 (금)', events: ['고려대학교', '성균관대학교(자연)'] },
  { date: '9월 7일 (월)', events: ['KIST', '동국대학교'] },
  {
    date: '9월 8일 (화)',
    events: ['이화여자대학교', '중견기업박람회(대전)'],
  },
  { date: '9월 9일 (수)', events: ['POSTECH'] },
  { date: '', events: [] },
  { date: '10월 7일 (수)', events: ['서울고용센터'] },
]

const regions = [
  { id: 'seoul', name: '서울' },
  { id: 'gyeonggi', name: '경기' },
  { id: 'gangwon', name: '강원' },
  { id: 'gyeongsang', name: '경상' },
  { id: 'chungcheong', name: '충청' },
  { id: 'jeolla', name: '전라' },
]

const excludedDates = {
  seoul: [
    '9월 21일 (월)',
    '9월 22일 (화)',
    '9월 23일 (수)',
    '9월 24일 (목)',
    '9월 25일 (금)',
    '10월 3일 (토)',
    '10월 4일 (일)',
    '10월 5일 (월)',
    '10월 6일 (화)',
    '10월 7일 (수)',
    '10월 8일 (목)',
    '10월 9일 (금)',
    '10월 10일 (토)',
    '10월 11일 (일)',
  ],
  chungcheong: [
    '9월 21일 (월)',
    '9월 22일 (화)',
    '9월 23일 (수)',
    '9월 24일 (목)',
    '9월 25일 (금)',
  ],
  jeolla: [
    '9월 21일 (월)',
    '9월 22일 (화)',
    '9월 23일 (수)',
    '9월 24일 (목)',
    '9월 25일 (금)',
    '9월 28일 (월)',
    '9월 29일 (화)',
    '9월 30일 (수)',
    '10월 1일 (목)',
    '10월 2일 (금)',
  ],
}

const weekdays = ['일', '월', '화', '수', '목', '금', '토']

function isCampusData(data) {
  return (
    Array.isArray(data) &&
    data.every(
      (item) =>
        typeof item.region === 'string' &&
        typeof item.date === 'string' &&
        typeof item.school === 'string' &&
        typeof item.location === 'string' &&
        typeof item.time === 'string' &&
        /^\d+월\s*\d+일/.test(item.date) &&
        regions.some((region) => region.name === item.region),
    )
  )
}

function dateNumber(value) {
  const match = /^(\d+)월\s*(\d+)일/.exec(value)
  return Number(match[1]) * 100 + Number(match[2])
}

function getCampusEntries(data, region) {
  const regionItems = data.filter(
    (item) => item.region === regions.find((entry) => entry.id === region).name,
  )
  if (!regionItems.length) return []

  const orderedItems = [...regionItems].sort(
    (first, second) => dateNumber(first.date) - dateNumber(second.date),
  )
  const eventsByDate = new Map()
  orderedItems.forEach((item) => {
    const events = eventsByDate.get(item.date) ?? []
    events.push({
      name: item.school,
      location: item.location,
      time: item.time,
    })
    eventsByDate.set(item.date, events)
  })

  const [firstMonth, firstDay] = orderedItems[0].date
    .match(/^(\d+)월\s*(\d+)일/)
    .slice(1)
    .map(Number)
  const [lastMonth, lastDay] = orderedItems.at(-1).date
    .match(/^(\d+)월\s*(\d+)일/)
    .slice(1)
    .map(Number)
  const firstDate = new Date(2026, firstMonth - 1, firstDay, 12)
  const lastDate = new Date(2026, lastMonth - 1, lastDay, 12)
  firstDate.setDate(firstDate.getDate() - ((firstDate.getDay() + 6) % 7))

  const entries = []
  for (
    const date = firstDate;
    date <= lastDate;
    date.setDate(date.getDate() + 1)
  ) {
    const weekday = date.getDay()
    if (weekday === 0 || weekday === 6) continue

    const dateLabel = `${date.getMonth() + 1}월 ${date.getDate()}일 (${weekdays[weekday]})`
    if (excludedDates[region]?.includes(dateLabel)) continue
    entries.push({ date: dateLabel, events: eventsByDate.get(dateLabel) ?? [] })
  }
  return entries
}

function ScheduleGrid({ entries, isCampus, expandedEventId, onToggleEvent }) {
  const triggerRefs = useRef(new Map())
  const detailRefs = useRef(new Map())

  useEffect(() => {
    if (expandedEventId) detailRefs.current.get(expandedEventId)?.focus()
  }, [expandedEventId])

  return (
    <div
      className={`exposition__date-grid${isCampus ? ' exposition__date-grid--campus' : ''}`}
      role="list"
    >
      {entries.map((entry, dateIndex) => (
        <div
          className="exposition__date-cell"
          key={`${entry.date}-${dateIndex}`}
          role="listitem"
          onBlur={(event) => {
            if (
              event.relatedTarget &&
              !event.currentTarget.contains(event.relatedTarget)
            ) {
              onToggleEvent(null)
            }
          }}
        >
          <div className="exposition__date">{entry.date}</div>
          <div className="exposition__events">
            {entry.events.map((item, eventIndex) => {
              const event =
                typeof item === 'string' ? { name: item } : item
              const eventId = `${dateIndex}-${eventIndex}`
              const isOpen = expandedEventId === eventId
              const detailId = `exposition-event-detail-${isCampus ? 'campus' : 'fair'}-${eventId}`

              if (!isCampus) {
                return (
                  <span
                    className="exposition__event-label"
                    key={`${event.name}-${eventIndex}`}
                  >
                    {event.name}
                  </span>
                )
              }

              return (
                <div key={`${event.name}-${eventIndex}`}>
                  <button
                    className="exposition__event"
                    ref={(element) => {
                      if (element) triggerRefs.current.set(eventId, element)
                      else triggerRefs.current.delete(eventId)
                    }}
                    type="button"
                    aria-label={`${entry.date} ${event.name} 일정 상세 보기`}
                    aria-controls={detailId}
                    aria-expanded={isOpen}
                    onClick={() => onToggleEvent(isOpen ? null : eventId)}
                  >
                    {event.name}
                  </button>
                  {isOpen && (
                    <div
                      className="exposition__event-detail-inline"
                      id={detailId}
                      ref={(element) => {
                        if (element) detailRefs.current.set(eventId, element)
                        else detailRefs.current.delete(eventId)
                      }}
                      tabIndex="0"
                      role="button"
                      aria-label={`${event.name} 세부 일정 닫기`}
                      onClick={() => {
                        onToggleEvent(null)
                        triggerRefs.current.get(eventId)?.focus()
                      }}
                      onKeyDown={(keyboardEvent) => {
                        if (
                          keyboardEvent.key === 'Enter' ||
                          keyboardEvent.key === ' ' ||
                          keyboardEvent.key === 'Escape'
                        ) {
                          keyboardEvent.preventDefault()
                          onToggleEvent(null)
                          triggerRefs.current.get(eventId)?.focus()
                        }
                      }}
                    >
                      <div>
                        <span className="exposition__event-detail-label">장소</span>
                        <span className="exposition__event-detail-value">
                          {event.location || '세부 장소 추후 안내'}
                        </span>
                      </div>
                      <div>
                        <span className="exposition__event-detail-label">시간</span>
                        <span className="exposition__event-detail-value">
                          {event.time || '운영 시간 추후 안내'}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}

function RecruitingSchedule() {
  const [activeTab, setActiveTab] = useState('fair')
  const [activeRegion, setActiveRegion] = useState('seoul')
  const [expandedEventId, setExpandedEventId] = useState(null)
  const campusData = usePublicJson(
    'data/campus_recruiting_schedule.json',
    isCampusData,
  )
  const campusEntries = campusData.data
    ? getCampusEntries(campusData.data, activeRegion)
    : []

  function activateTab(tab) {
    setActiveTab(tab)
    setExpandedEventId(null)
  }

  return (
    <>
      <div className="exposition__tabs-wrap">
        <div
          className="exposition__tabs"
          role="tablist"
          aria-label="박람회 및 캠퍼스 일정"
          onKeyDown={(event) => {
            const tabOrder = ['fair', 'campus']
            const currentIndex = tabOrder.indexOf(activeTab)
            let nextIndex = currentIndex
            if (event.key === 'ArrowRight') nextIndex = (currentIndex + 1) % 2
            else if (event.key === 'ArrowLeft') nextIndex = (currentIndex + 1) % 2
            else if (event.key === 'Home') nextIndex = 0
            else if (event.key === 'End') nextIndex = 1
            else return
            event.preventDefault()
            const tab = tabOrder[nextIndex]
            activateTab(tab)
            document.getElementById(`exposition-tab-${tab}`)?.focus()
          }}
        >
          <button
            className="exposition__tab"
            id="exposition-tab-fair"
            type="button"
            role="tab"
            aria-selected={activeTab === 'fair'}
            aria-controls="exposition-panel-fair"
            tabIndex={activeTab === 'fair' ? 0 : -1}
            onClick={() => activateTab('fair')}
          >
            박람회
          </button>
          <button
            className="exposition__tab"
            id="exposition-tab-campus"
            type="button"
            role="tab"
            aria-selected={activeTab === 'campus'}
            aria-controls="exposition-panel-campus"
            tabIndex={activeTab === 'campus' ? 0 : -1}
            onClick={() => activateTab('campus')}
          >
            캠퍼스
          </button>
        </div>
      </div>
      <div
        className="exposition__panel"
        id="exposition-panel-fair"
        role="tabpanel"
        aria-labelledby="exposition-tab-fair"
        tabIndex="0"
        hidden={activeTab !== 'fair'}
      >
        <div className="exposition__schedule" id="exposition-schedule-fair">
          <ScheduleGrid
            entries={fairSchedule}
            expandedEventId={expandedEventId}
            isCampus={false}
            onToggleEvent={setExpandedEventId}
          />
        </div>
        <p className="exposition__event-detail" role="status" hidden></p>
      </div>
      <div
        className="exposition__panel"
        id="exposition-panel-campus"
        role="tabpanel"
        aria-labelledby="exposition-tab-campus"
        tabIndex="0"
        hidden={activeTab !== 'campus'}
      >
        <div
          className="exposition__region-tabs"
          role="group"
          aria-label="캠퍼스 방문 지역"
        >
          {regions.map((region) => (
            <button
              className="exposition__region"
              key={region.id}
              type="button"
              aria-pressed={activeRegion === region.id}
              onClick={() => {
                setActiveRegion(region.id)
                setExpandedEventId(null)
              }}
            >
              {region.name}
            </button>
          ))}
        </div>
        <div
          className="exposition__schedule"
          id="exposition-schedule-campus"
          aria-live="polite"
        >
          {campusData.loading && (
            <p className="exposition__empty" role="status">
              캠퍼스 일정을 불러오는 중입니다.
            </p>
          )}
          {campusData.error && (
            <p className="exposition__empty" role="alert">
              캠퍼스 일정을 불러오지 못했습니다. 잠시 후 다시 확인해 주세요.
            </p>
          )}
          {campusData.data && (
            <ScheduleGrid
              entries={campusEntries}
              expandedEventId={expandedEventId}
              isCampus
              onToggleEvent={setExpandedEventId}
            />
          )}
        </div>
        <p className="exposition__event-detail" role="status" hidden></p>
      </div>
    </>
  )
}

export default RecruitingSchedule
