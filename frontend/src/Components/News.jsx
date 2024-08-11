import React, { useEffect, useState } from 'react';
import './styles.css'; // Import the custom CSS file

const NewsCard = () => {
  const [newsData, setNewsData] = useState([]);
  const [prevNewsData, setPrevNewsData] = useState([]); // Store previous news data

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('http://localhost:5000/news');
        const data = await response.json();
        console.log(data); // For debugging: check the structure of the fetched data

        // Map the fetched data to the expected structure
        const mappedData = data.articles.map(article => ({
          title: article.title,
          description: article.description,
          content: article.content,
          url: article.url,
          image: article.image || 'https://via.placeholder.com/150',
          datePublished: article.publishedAt,
          author: article.author || 'Unknown',
        }));

        // Check for new articles
        if (prevNewsData.length > 0) {
          const newArticles = mappedData.filter(
            article => !prevNewsData.some(prev => prev.url === article.url)
          );
          if (newArticles.length > 0) {
            showNotification(newArticles);
            playSound();
          }
        }

        setPrevNewsData(mappedData); // Update previous news data
        setNewsData(mappedData);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    const showNotification = (newArticles) => {
      if (Notification.permission === 'granted') {
        newArticles.forEach(article => {
          new Notification('New Article Available', {
            body: article.title,
            icon: article.image,
          });
        });
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
            showNotification(newArticles);
          }
        });
      }
    };

    const playSound = () => {
      const audio = new Audio('/notification.mp3');
      audio.play();
    };

    fetchNews();
    const interval = setInterval(fetchNews, 60000); // Fetch news every minute

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [prevNewsData]);

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-white space-y-4 max-h-96 overflow-y-auto scrollbar-thin">
      {newsData.length > 0 ? (
        newsData.map((news, index) => (
          <div
            key={index}
            className="flex bg-gray-900 p-4 rounded-lg items-center transform transition-transform hover:scale-102 hover:shadow-lg"
          >
            <div className="w-1/4 mr-4">
              <img
                src={news.image}
                alt={news.title}
                className="rounded-lg w-full h-auto transform transition-transform hover:scale-105"
              />
            </div>
            <div className="flex flex-col w-3/4">
              <span className="text-lg font-semibold">{news.title}</span>
              <span className="text-sm text-gray-400 mb-2">
                Published: {new Date(news.datePublished).toLocaleDateString()}
              </span>
              <span className="text-sm text-gray-400 mb-2">
                Author: {news.author}
              </span>
              <p className="text-sm">{news.description}</p>
              <a href={news.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                Read more
              </a>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-400">No news available.</p>
      )}
    </div>
  );
};

export default NewsCard;


// // export default NewsCard;
// import React, { useEffect, useState } from 'react';
// import './styles.css'; // Import the custom CSS file

// const NewsCard = () => {
//   const [newsData, setNewsData] = useState([]); // Initialize as an empty array

//   useEffect(() => {
//     // Example: Hardcoded data instead of fetching
//     const exampleData = {
//       articles: [
//         {
//           title: "PM Modi conducts aerial survey of landslide-hit areas in Wayanad, says 'This disaster is not normal'",
//           description: "PM Modi in Wayanad: More than 300 people died and many remain unaccounted for after landslides hit the region on July 30 in what is seen as one of the biggest natural disasters to have impacted the southern state.",
//           content: "Follow us on Image Source : INDIA TV PM Modi conducts aerial survey of landslide-ravaged Chooralmala, Mundakkai areas in Wayanad\nPrime Minister Narendra Modi carried out an aerial survey on Saturday of disaster-hit areas of Chooralmala, Mundakkai, and other affected regions in Wayanad.",
//           url: "https://www.indiatvnews.com/news/india/kerala-pm-modi-in-wayanad-conducts-aerial-survey-of-landslide-hit-areas-in-wayanad-updates-2024-08-10-946179",
//           image: "https://resize.indiatvnews.com/en/resize/newbucket/1200_-/2024/08/modi-aerial-1723275416.jpeg",
//           publishedAt: "2024-08-10T06:05:12Z",
//           source: {
//             name: "India TV News",
//             url: "https://www.indiatvnews.com"
//           }
//         },
//         {
//           title: "Top US Domestic News Briefs: Legal Battles, Natural Disasters, and Political Showdowns",
//           description: "The latest US domestic news includes a lawsuit against a Biden health insurance rule, flooding in Alaska's capital, and a religious controversy in public schools. Additionally, Hunter Biden faces new allegations, a Tennessee man is charged in a North Korea IT scheme, Kamala Harris gains ground in polls, and a significant 3D-printing project nears completion in Texas.",
//           content: "A group of Republican-led states have initiated a lawsuit aiming to prevent the Biden administration from granting health insurance to up to 200,000 immigrants brought to the U.S. illegally as children. The states argue that the rule adopted by the U.S. government is unlawful.",
//           url: "https://www.devdiscourse.com/article/politics/3046576-top-us-domestic-news-briefs-legal-battles-natural-disasters-and-political-showdowns",
//           image: "https://www.devdiscourse.com/remote.axd?https://devdiscourse.blob.core.windows.net/aiimagegallery/07_08_2024_13_01_25_4431613.png?width=920&format=jpeg",
//           publishedAt: "2024-08-08T23:52:34Z",
//           source: {
//             name: "Devdiscourse",
//             url: "https://www.devdiscourse.com"
//           }
//         },
//         {
//           title: "5 Key Questions You Must Know for Prelims and Mains",
//           description: "With the recent devastating Wayanad landslide, it has become crucial to have a broad understanding of landslides to effectively manage such natural disasters. This topic is also important for your exams. Here are five important Q&As on landslides that you shouldn’t miss.",
//           content: "🚨 The Indian Express UPSC Essentials brings to you the July edition of its monthly magazine. Click Here to read. Share your views and suggestions in the comment box or at manas.srivastava@indianexpress.com🚨\nAdvertisement\nWhat is the issue?\nIn recent times, landslides have become increasingly significant due to their impact on various regions. Understanding these events is crucial for both academic and practical purposes.",
//           url: "https://indianexpress.com/article/upsc-current-affairs/upsc-essentials/upsc-issue-at-a-glance-landslides-questions-for-prelims-and-mains-9502175/",
//           image: "https://images.indianexpress.com/2024/08/UPSC-ISSUE-AT-A-GLANCE-Landslides-1.jpg",
//           publishedAt: "2024-08-08T08:15:37Z",
//           source: {
//             name: "The Indian Express",
//             url: "https://indianexpress.com"
//           }
//         },
//         {
//           title: "India Lost Over 10,000 lives In Natural Disasters Since 2019-20, Govt Tells Parliament Amid Climate Change Concerns",
//           description: "On average, 2,000 people have died in such natural disasters every year since 2019-20, and the death toll touched 2,616 in 2023-24, most from flood-prone Bihar and Himachal Pradesh",
//           content: "Nearly 10,216 people lost their lives in hydro-meteorological disasters which hit India over the past five years, the government told Parliament on Monday in the aftermath of catastrophic landslides in Kerala and multiple cloudbursts in Himachal Pradesh.",
//           url: "https://www.news18.com/india/india-lost-over-10000-lives-in-natural-disasters-since-2019-20-govt-tells-parliament-amid-climate-change-concerns-8991706.html",
//           image: "https://images.news18.com/ibnlive/uploads/2024/07/kerala-wayanad-2024-07-69dc65212046479bd237e5e7b4914e7d-16x9.jpg?impolicy=website&width=1200&height=675",
//           publishedAt: "2024-08-06T08:49:58Z",
//           source: {
//             name: "News18",
//             url: "https://www.news18.com"
//           }
//         },
//         {
//           title: "Natural catastrophes: Insurance cover proposal hangs fire for over a decade",
//           description: "The Standing Committee said that the natural disasters can cause a lot of damage to infrastructure in India, a country that faces many natural hazards because of its demographic and geographic features",
//           content: "While the country has suffered heavily in terms of human fatalities and economic losses due to natural catastrophes every now and then, proposals by the insurance industry to bring the population and properties in the country under a catastrophe insurance scheme have been pending for over a decade.",
//           url: "https://indianexpress.com/article/business/wayanad-landslide-natural-catastrophes-insurance-cover-proposal-standing-committee-on-finance-9495225/",
//           image: "https://images.indianexpress.com/2024/08/Business.jpg",
//           publishedAt: "2024-08-04T23:17:06Z",
//           source: {
//             name: "The Indian Express",
//             url: "https://indianexpress.com"
//           }
//         },
//         {
//           title: "Flood mitigation in Bihar, 4 other states",
//           description: "Bihar to get Rs 11,500 core; environmentalist says holistic plan needed as natural disasters only to get worse.",
//           content: "“Bihar has frequently suffered from floods, many of them originating outside the country. Plans to build flood control structures in Nepal are yet to progress,” the finance minister said. Presenting the Union Budget before the Lok Sabha, Sitharaman highlighted various flood mitigation projects.",
//           url: "https://theprint.in/budget/budget-2024-funds-schemes-for-flood-mitigation-in-bihar-4-other-states/2187503/",
//           image: "https://static.theprint.in/wp-content/uploads/2019/09/floods.jpg",
//           publishedAt: "2024-07-23T13:01:02Z",
//           source: {
//             name: "ThePrint",
//             url: "https://theprint.in"
//           }
//         },
//         {
//           title: "Current World News Briefs: Political Turmoil, Natural Disasters, and Global Conflicts",
//           description: "This summary covers major global events: VP Kamala Harris's fundraising efforts, wildfires in Canada, Israeli settlers' alliances with U.S. Republicans, Cyprus's divided commemorations, Trump's gunshot wound and foreign relations, Israeli airstrikes in Yemen, and Bangladesh's curfew enforced due to deadly job quota protests.",
//           content: "U.S. Vice President Kamala Harris spearheaded efforts for Biden's re-election in Massachusetts despite internal party pressures. 'We are going to win this election,' she asserted. Wildfires in Alberta and British Columbia compelled evacuations, with significant damage reported.",
//           url: "https://www.devdiscourse.com/article/politics/3024527-current-world-news-briefs-political-turmoil-natural-disasters-and-global-conflicts",
//           image: "https://www.devdiscourse.com/remote.axd?https://devdiscourse.blob.core.windows.net/imagegallery/27_05_2019_12_10_31_1940386.jpg?width=920&format=jpeg",
//           publishedAt: "2024-07-20T23:52:07Z",
//           source: {
//             name: "Devdiscourse",
//             url: "https://www.devdiscourse.com"
//           }
//         },
//         {
//           title: "Himachal CM Seeks Urgent Disaster Funds from Union Home Minister",
//           description: "Himachal Pradesh CM Sukhvinder Singh Sukhu met Union Home Minister Amit Shah to discuss the state's vulnerability to natural disasters and requested the release of Rs 9,042 crore for disaster management. He also highlighted the need for additional funds and approval for pending projects.",
//           content: "Himachal Pradesh Chief Minister Sukhvinder Singh Sukhu has urged the Union Home Minister for urgent assistance to address the state's recurring natural disasters. The request includes the immediate release of funds and expedited approval of various disaster management projects.",
//           url: "https://www.indianexpress.com/article/india/himachal-pradesh-cm-meets-union-home-minister-urgent-funds-for-disaster-management-9482970/",
//           image: "https://images.indianexpress.com/2024/08/Himachal-Disaster.jpg",
//           publishedAt: "2024-07-16T09:03:07Z",
//           source: {
//             name: "The Indian Express",
//             url: "https://indianexpress.com"
//           }
//         },
//         {
//           title: "Kerala Landslide Death Toll Rises to 10 as Rescue Operations Continue",
//           description: "The death toll from the devastating landslide in Kerala has risen to 10, with search and rescue operations ongoing. The government has announced relief measures and is working to provide aid to affected families.",
//           content: "Kerala's Chief Minister Pinarayi Vijayan has confirmed that the death toll from the recent landslide has reached 10. The state government has mobilized resources for search and rescue operations and is offering support to those affected. Relief measures are being implemented to address the immediate needs of the impacted families.",
//           url: "https://www.timesnownews.com/kerala-news/kerala-landslide-death-toll-rises-to-10-article-95712345",
//           image: "https://images.timesnownews.com/story/2024/08/landslide_kerala.jpg",
//           publishedAt: "2024-08-10T09:15:22Z",
//           source: {
//             name: "Times Now",
//             url: "https://www.timesnownews.com"
//           }
//         }
//       ]
//     };

//     // Set the fetched data to state
//     setNewsData(exampleData.articles);
//   }, []);

//   return (
//     <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-white space-y-4 max-h-[61vh] overflow-y-auto scrollbar-thin">
//       {newsData.length > 0 ? (
//         newsData.map((news, index) => (
//           <div
//             key={index}
//             className="flex bg-gray-900 p-4 rounded-lg items-center transform transition-transform hover:scale-102 hover:shadow-lg"
//           >
//             <div className="w-1/4 mr-4">
//               <img
//                 src={news.image || 'https://via.placeholder.com/150'} // Fallback image if not provided
//                 alt={news.title}
//                 className="rounded-lg w-full h-auto transform transition-transform hover:scale-105"
//               />
//             </div>
//             <div className="flex flex-col w-3/4">
//               <span className="text-lg font-semibold">{news.title}</span>
//               <span className="text-sm text-gray-400 mb-2">
//                 Published: {new Date(news.publishedAt).toLocaleDateString()}
//               </span>
//               <span className="text-sm text-gray-400 mb-2">
//                 Source: {news.source?.name || 'Unknown'}
//               </span>
//               <p className="text-sm">{news.description}</p>
//               <a href={news.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
//                 Read more
//               </a>
//             </div>
//           </div>
//         ))
//       ) : (
//         <p className="text-gray-400">No news available.</p>
//       )}
//     </div>
//   );
// };

// export default NewsCard;
