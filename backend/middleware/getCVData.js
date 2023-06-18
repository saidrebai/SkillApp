

const getCVData = async (result ) => {
  const wordsToExtract = ["JavaScript", "Python","BASH","linux","Html","Css","Docker","Devops","mySQL","MySQL","Wordpress","Php","SQL","php","PHP",
"javaScript","js","Js","python","bash","Bash","Linux","LINUX","HTML","html","HTML5","CSS","docker","DOCKER","devops","DevOps","wordpress",
"kubernetes","Kubernetes","Laravel","laravel","LARAVEL","wordPress","WordPress"];
  try {
    const relevantData = {
      skills: [],
    };

    result.Lines.forEach((line) => {
      const words = line.LineText.trim().split(/[ ,]+/);
      wordsToExtract.forEach((word) => {
        if (words.includes(word)) {
          relevantData.skills.push(word);
        }
      });
    });

    console.log(relevantData);
    return relevantData;
  } catch (err) {
    console.error(err);
    throw err;
  }
};


module.exports = getCVData;
