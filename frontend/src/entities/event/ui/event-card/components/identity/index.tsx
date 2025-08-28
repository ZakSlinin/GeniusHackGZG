import s from "./index.module.scss";

export const EventIdentity = ({
                                category,
                                name,
                                organization,
                                description
                              }: {
  category: string;
  name: string;
  organization: string;
  description: string;
}) => {
  return (
    <div className={s.identity}>
      <strong className={s.category}>{category}</strong>
      <h3>{name}</h3>
      <p className={s.organization}>{organization}</p>
      <p className={s.description}>{description}</p>
    </div>
  );
};