import { storageGet, storageSet } from "./storage";


const STORAGE_KEY = "streak_activity_v2";
const pad2 = (n: number) => String(n).padStart(2, "0");
export const todayUtcKey = () => dateKeyOf(new Date());
export const ACTIVITY_UPDATED_EVENT = "streak-activity-updated";

export const dateKeyOf = (d: Date | string) => {
  const dateObj = d instanceof Date ? d : new Date(d);

  const year = dateObj.getUTCFullYear();
  const month = pad2(dateObj.getUTCMonth() + 1);
  const day = pad2(dateObj.getUTCDate());

  return `${year}-${month}-${day}`;
};

export const getActivityMap = async () => {
  try {
    const raw = await storageGet(STORAGE_KEY);
    const parsed = typeof raw === "string" ? JSON.parse(raw) : raw;
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
      return parsed;
    }
  } catch (error) {
    console.error("Failed to read activity:", error);
  }

  return {};
};

const saveActivityMap = (map: Record<string, number>) => storageSet(STORAGE_KEY, JSON.stringify(map));

const notifyUpdated = () => {
  window.dispatchEvent(new Event(ACTIVITY_UPDATED_EVENT));
};


export const recordActivity = async (points : number = 1) => {
  const add = Math.max(0, Math.floor(points));

  if (add <= 0) return;

  const map = await getActivityMap();
  const key = todayUtcKey();
  const current = Number(map[key]);
  map[key] = (Number.isFinite(current) && current > 0 ? current : 0) + add;
  await saveActivityMap(map);

  notifyUpdated();
};

export const removeActivity = async (points = 1) => {
  const remove = Math.max(0, Math.floor(points));

  if (remove <= 0) return;

  const map = await getActivityMap();
  const key = todayUtcKey();
  const current = Number(map[key]);

  if (!Number.isFinite(current) || current <= 0) return;

  map[key] = Math.max(0, current - remove);

  await saveActivityMap(map);
  notifyUpdated();
};