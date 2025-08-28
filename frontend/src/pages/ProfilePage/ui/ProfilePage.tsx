import { User, MapPin} from 'lucide-react';
import s from './ProfilePage.module.scss';
import { Email } from '@/shared/icons';
import { Link } from 'react-router-dom';

interface UserProfile {
  UserID: number;
  Username: string;
  Email: string;
  EventsCoordinated: number;
  CurrentCoordinate: number[];
}

export const ProfilePage = () => {
  const userProfile: UserProfile = {
    UserID: 12,
    Username: "ivan",
    Email: "ivan@mail.ru",
    EventsCoordinated: 2,
    CurrentCoordinate: [1, 5]
  };

  return (
    <div className={s.container}>

      <div className={s.mainContent}>
        <div className={s.grid}>
          {/* Profile Sidebar */}
          <div className={s.sidebar}>
            <div className={s.profileCard}>
              <div className={s.profileHeader}>
                <div className={s.profileInfo}>
                  <div className={s.avatar}>
                    <User className={s.avatarIcon} />
                  </div>
                  <div>
                    <h1 className={s.username}>{userProfile.Username}</h1>
                    <p className={s.userId}>ID: #{userProfile.UserID}</p>
                  </div>
                </div>
              </div>
              
              <div className={s.profileDetails}>
                <div className={s.profileItem}>
                  <Email/>
                  <span>{userProfile.Email}</span>
                </div>
                <div className={s.profileItem}>
                  <MapPin className={s.profileIcon} />
                  <span>Сейчас Координирую: [{userProfile.CurrentCoordinate.join(', ')}]</span>
                </div>
                <Link to={'/'}>
                <button className={s.findEventsButton} >
                  Найти мероприятия
                </button>
                </Link>
              </div>
            </div>
          </div>
            <div className={s.profileSummary}>
              <h3 className={s.summaryTitle}>Информация о профиле</h3>
              <div className={s.summaryContent}>
                <div className={s.summaryItem}>
                  <strong>Имя пользователя:</strong> {userProfile.Username}
                </div>
                <div className={s.summaryItem}>
                  <strong>Email:</strong> {userProfile.Email}
                </div>
                <div className={s.summaryItem}>
                  <strong>ID пользователя:</strong> {userProfile.UserID}
                </div>
                <div className={s.summaryItem}>
                  <strong>Сейчас координирую:</strong> [{userProfile.CurrentCoordinate.join(', ')}]
                </div>
                <div className={s.summaryItem}>
                  <strong>Мероприятий координирую:</strong> {userProfile.EventsCoordinated}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

  );
}; 