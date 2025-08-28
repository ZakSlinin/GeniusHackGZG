import { useState } from 'react';
import { Calendar, User, Check, X, MapPin } from 'lucide-react';
import s from './EventCoordinationPage.module.scss';
import type { Volunteer, Event } from '@/shared/types/types';

export const EventCoordinationPage = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'confirmed'>('all');

  // Моковые данные события
  const event: Event = {
    EventID: 1,
    Name: "Название активного мероприятия",
    Category: "биология",
    CreatedBy: "Корпа",
    Date: "18.11.2025",
    TimeStart: "12:00",
    TimeEnd: "15:00",
    Location: "Арзамас, ул. qweqwe",
    VolunteerNeedCount: 8,
    VolunteerCount: 5,
    ShortDescription: "qweqqw",
    Description: "qweqwe",
    VolunteersGroups: [
      {
        GroupID: 10,
        Name: "Лаборанты",
        Needed: 5,
        Registered: 3,
        Requirements: ["белый халат"],
        Volunteers: [
          { UserID: 1, Username: "Иван Иванов", Email: "ivan@mail.ru", Status: 'confirmed' },
          { UserID: 2, Username: "Петр Петров", Email: "petr@mail.ru", Status: 'rejected' },
          { UserID: 3, Username: "Анна Сидорова", Email: "anna@mail.ru", Status: 'rejected' },
          { UserID: 4, Username: "Мария Козлова", Email: "maria@mail.ru", Status: 'confirmed' },
          { UserID: 5, Username: "Алексей Волков", Email: "alex@mail.ru", Status: 'registered' },
        ]
      },
      {
        GroupID: 11,
        Name: "Организация зала",
        Needed: 1,
        Registered: 1,
        Requirements: [],
        Volunteers: [
          { UserID: 6, Username: "Елена Морозова", Email: "elena@mail.ru", Status: 'confirmed' },
        ]
      }
    ],
    Coordinator: {
      UserID: 12,
      Username: "ivan"
    }
  };

  const allVolunteers = event.VolunteersGroups.flatMap(group => group.Volunteers);
  const pendingVolunteers = allVolunteers.filter(v => v.Status === 'registered');
  const confirmedVolunteers = allVolunteers.filter(v => v.Status === 'confirmed');
  const rejectedVolunteers = allVolunteers.filter(v => v.Status === 'rejected');

  const getVolunteersByTab = () => {
    switch (activeTab) {
      case 'all':
        return allVolunteers;
      case 'pending':
        return pendingVolunteers;
      case 'confirmed':
        return confirmedVolunteers;
      default:
        return allVolunteers;
    }
  };

  const handleStatusChange = (volunteerId: number, newStatus: Volunteer['Status']) => {
    console.log(`Volunteer ${volunteerId} status changed to ${newStatus}`);
  };

  return (
    <div className={s.container}>
    <div className={s.mainContent}>
        <h1 className={s.pageTitle}>Координировать мероприятие</h1>

        <div className={s.statusCards}>
          <div className={`${s.statusCard} ${s.statusCardBlue}`}>
            <Calendar className={s.cardIcon} />
            <span className={s.cardText}>1 мероприятие</span>
          </div>
          <div className={`${s.statusCard} ${s.statusCardLightBlue}`}>
            <User className={s.cardIcon} />
            <span className={s.cardText}>5 человек</span>
          </div>
          <div className={`${s.statusCard} ${s.statusCardGreen}`}>
            <Check className={s.cardIcon} />
            <span className={s.cardText}>2 подтверждено</span>
          </div>
          <div className={`${s.statusCard} ${s.statusCardRed}`}>
            <X className={s.cardIcon} />
            <span className={s.cardText}>2 отменено</span>
          </div>
        </div>

        <div className={s.eventDetails}>
          <div className={s.eventHeader}>
            <span className={s.eventLabel}>Выберите мероприятие</span>
            <span className={s.eventName}>{event.Name}</span>
          </div>
          <div className={s.eventInfo}>
            <div className={s.eventInfoItem}>
              <Calendar className={s.eventIcon} />
              <span>Дата мероприятия</span>
            </div>
            <div className={s.eventInfoItem}>
              <MapPin className={s.eventIcon} />
              <span>{event.Location}</span>
            </div>
          </div>
        </div>

        <div className={s.volunteerManagement}>
          <h2 className={s.sectionTitle}>Управление волонтёрами</h2>
          
          <div className={s.tabs}>
            <button 
              className={`${s.tab} ${activeTab === 'all' ? s.tabActive : ''}`}
              onClick={() => setActiveTab('all')}
            >
              Все ({allVolunteers.length})
            </button>
            <button 
              className={`${s.tab} ${activeTab === 'pending' ? s.tabActive : ''}`}
              onClick={() => setActiveTab('pending')}
            >
              Ожидают ({pendingVolunteers.length})
            </button>
            <button 
              className={`${s.tab} ${activeTab === 'confirmed' ? s.tabActive : ''}`}
              onClick={() => setActiveTab('confirmed')}
            >
              Подтверждены ({confirmedVolunteers.length})
            </button>
          </div>

          <div className={s.volunteerList}>
            {getVolunteersByTab().map((volunteer) => (
              <div key={volunteer.UserID} className={s.volunteerCard}>
                <div className={s.volunteerInfo}>
                  <div className={s.volunteerName}>{volunteer.Username}</div>
                  <div className={s.volunteerRole}>роль волонтёра</div>
                  <div className={s.volunteerContacts}>
                    {volunteer.Email}, телефон, telegram
                  </div>
                </div>
                <div className={s.volunteerActions}>
                  {volunteer.Status === 'confirmed' && (
                    <button className={`${s.actionButton} ${s.actionButtonConfirmed}`}>
                      Подтверждён
                    </button>
                  )}
                  {volunteer.Status === 'rejected' && (
                    <button className={`${s.actionButton} ${s.actionButtonRejected}`}>
                      Отклонён
                    </button>
                  )}
                  {volunteer.Status === 'registered' && (
                    <>
                      <button 
                        className={`${s.actionButton} ${s.actionButtonConfirm}`}
                        onClick={() => handleStatusChange(volunteer.UserID, 'confirmed')}
                      >
                        Подтвердить
                      </button>
                      <button 
                        className={`${s.actionButton} ${s.actionButtonReject}`}
                        onClick={() => handleStatusChange(volunteer.UserID, 'rejected')}
                      >
                        Отклонить
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={s.roleCompletion}>
          <h2 className={s.sectionTitle}>Заполнение ролей</h2>
          <div className={s.roleProgress}>
            <div className={s.roleItem}>
              <span className={s.roleName}>Название роли</span>
              <div className={s.progressBar}>
                <div className={s.progressFill} style={{ width: '20%' }}></div>
              </div>
              <span className={s.roleCount}>1/5</span>
            </div>
            <div className={s.roleItem}>
              <span className={s.roleName}>Название роли</span>
              <div className={s.progressBar}>
                <div className={s.progressFill} style={{ width: '100%' }}></div>
              </div>
              <span className={s.roleCount}>1/1</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 