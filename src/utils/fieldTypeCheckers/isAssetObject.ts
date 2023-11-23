export default function isAssetObject(obj: object) {
  if (typeof obj !== 'object' || obj == null) {
    return false;
  }

  if (!obj) return false;

  const requiredKeys = [
    'alt',
    'custom_data',
    'focal_point',
    'title',
    'upload_id',
  ];

  for (const key of requiredKeys) {
    if (!obj.hasOwnProperty(key)) {
      return false;
    }
  }

  return true;
}
