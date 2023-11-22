import { ProgressObject } from './types';

function getLanguageCode(lc_cc: string) {
  if (lc_cc.includes('-')) {
    return lc_cc.split('-')[0];
  }

  return lc_cc;
}

export default async function fetchCrowdinStatus(
  projectID: string,
  recordID: string,
  crowdinApiKey: string,
  localesInThisRecord: Array<string>,
  setSourceLocale: React.Dispatch<React.SetStateAction<string[]>>
) {
  const fileIDResponse = await (
    await fetch(
      `https://api.crowdin.com/api/v2/projects/${projectID}/files?filter=record${recordID}Source`,
      {
        headers: {
          Authorization: `Bearer ${crowdinApiKey}`,
          'Content-Type': 'application/json',
        },
      }
    )
  ).json();

  if (!fileIDResponse.data.length) return null;

  const fileID = fileIDResponse.data[0].data.id;

  const sourceArray = fileIDResponse.data[0].data.name.split('Source');

  setSourceLocale([sourceArray[sourceArray.length - 1].split('.json')[0]]);

  const fileProgressResponse = await (
    await fetch(
      `https://api.crowdin.com/api/v2/projects/${projectID}/files/${fileID}/languages/progress`,
      {
        headers: {
          Authorization: `Bearer ${crowdinApiKey}`,
          'Content-Type': 'application/json',
        },
      }
    )
  ).json();

  const progressObject: ProgressObject = {};

  fileProgressResponse.data.map((progress: any) => {
    const lc = getLanguageCode(progress.data.languageId);
    if (localesInThisRecord.includes(lc)) {
      progressObject[lc] = progress.data.phrases;
    }
  });

  return progressObject;
}
