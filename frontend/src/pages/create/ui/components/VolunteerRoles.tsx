import { Input, Textarea } from "@/shared/ui/input/";
import { useFieldArray, useFormContext } from "react-hook-form";
import type { Ievent } from "@/shared/interfaces/Ievent.tsx";
import s from "../createEvent.module.scss";
import { TrashBucket } from "@/shared/icons/TrashBucket";

export const VolunteerRolesSection = () => {
  const { control, register, getValues } = useFormContext<Ievent>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "volunteerGroups",
  });

  const addRole = (e: React.FormEvent) => {
    e.preventDefault();
    const currentRoles = getValues("volunteerGroups") || [];
    const last = currentRoles.at(-1);
    if (!last) {
      append({ name: "", needed: 0, registered: 0, requirements: "" });
      return;
    }
    const isLastEmpty =
      (last.name || "").trim() === "" &&
      (Number.isNaN(Number(last.needed)) || Number(last.needed) === 0) &&
      (last.requirements || "").trim() === "";
    if (!isLastEmpty) {
      append({ name: "", needed: 0, registered: 0, requirements: "" });
    }
  };

  const deleteRole = (index: number) => {
    remove(index);
  };

  return (
    <div className={s.rolesOfVolunteers}>
      <span className={s.informationBar}>
        <h2>Роли волонтёров</h2>
        <button type="button" className={s.addRoleButton} onClick={addRole}>
          Добавить роль
        </button>
      </span>
      {fields.map((_, i) => (
        <div className={s.newRouteContainer} key={i}>
          <span>
            <Input
              required
              label={"Название роли"}
              placeholder={"Введите название роли"}
              {...register(`volunteerGroups.${i}.name` as const, {
                required: true,
              })}
            />

            <Input
              required
              label={"Количество человек"}
              type={"number"}
              placeholder={"1"}
              {...register(`volunteerGroups.${i}.needed` as const, {
                required: true,
                valueAsNumber: true,
                min: 1,
                max: 10000,
                validate: (v) => Number.isInteger(v),
              })}
            />
            <button
              type="button"
              onClick={() => deleteRole(i)}
              className={"deleteRoleButton"}
            >
              <TrashBucket />
            </button>
          </span>

          <Textarea
            label={"Описание обязанностей"}
            required
            placeholder={"Опишите обязанности волонтёров"}
            {...register(`volunteerGroups.${i}.requirements` as const, {
              required: true,
            })}
          />
        </div>
      ))}
    </div>
  );
};
