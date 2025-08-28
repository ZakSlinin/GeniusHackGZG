import s from './ProfilePage.module.scss';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { ProfileStore } from '@/shared/store/profile-store';
import { useEffect } from 'react';
import type { UserProfile } from '@/shared/types/user';
import { MapPin, User } from 'lucide-react';
import { Email } from '@/shared/icons';

const profileStore = new ProfileStore();

export const ProfilePage = observer(() => {
  useEffect(() => {
    profileStore.fetchProfileData();
  }, []);

  const userProfile = profileStore.ProfileData?.value as UserProfile;

  if (profileStore.ProfileData?.state === "pending") {
    return <div>Загрузка профиля...</div>;
  }

  if (profileStore.ProfileData?.state === "rejected") {
    return <div>Ошибка загрузки профиля.</div>;
  }

  if (!userProfile) {
    return <div>Данные профиля отсутствуют.</div>;
  }

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
                  <Email />
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
}); 