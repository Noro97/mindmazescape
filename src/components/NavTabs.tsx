import { useState } from "react";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";

function classNames(...classes: string[
     
]) {
  return classes.filter(Boolean).join(" ");
}

export default function NavTabs() {
  const [categories] = useState({
    Recent: [
      {
        id: 1,
        title: "Does drinking coffee make you smarter?",
        date: "5h ago",
        commentCount: 5,
        shareCount: 2,
      },
      {
        id: 2,
        title: "So you've bought coffee... now what?",
        date: "2h ago",
        commentCount: 3,
        shareCount: 2,
      },
      {
        id: 3,
        title: "So you've bought coffee... now what?",
        date: "2h ago",
        commentCount: 3,
        shareCount: 2,
      },
      {
        id: 4,
        title: "So you've bought coffee... now what?",
        date: "2h ago",
        commentCount: 3,
        shareCount: 2,
      },
      {
        id: 5,
        title: "So you've bought coffee... now what?",
        date: "2h ago",
        commentCount: 3,
        shareCount: 2,
      },
    ],
    Popular: [
      {
        id: 1,
        title: "Is tech making coffee better or worse?",
        date: "Jan 7",
        commentCount: 29,
        shareCount: 16,
      },
      {
        id: 2,
        title: "The most innovative things happening in coffee",
        date: "Mar 19",
        commentCount: 24,
        shareCount: 12,
      },
    ],
    Trending: [
      {
        id: 1,
        title: "Ask Me Anything: 10 answers to your questions about coffee",
        date: "2d ago",
        commentCount: 9,
        shareCount: 5,
      },
      {
        id: 2,
        title: "The worst advice we've ever heard about coffee",
        date: "4d ago",
        commentCount: 1,
        shareCount: 2,
      },
    ],
    Friends: [
      {
        id: 1,
        title: "Ask Me Anything: 10 answers to your questions about coffee",
        date: "2d ago",
        commentCount: 9,
        shareCount: 5,
      },
      {
        id: 2,
        title: "The worst advice we've ever heard about coffee",
        date: "4d ago",
        commentCount: 1,
        shareCount: 2,
      },
    ],
  });

  return (
    <div className="w-full px-1 py-3">
      <TabGroup>
        <TabPanels className="mb-2">
          {Object.values(categories).map((posts, idx) => (
            <TabPanel
              key={idx}
              className={classNames(
              
                "rounded-xl overflow-y-scroll h-[210px] bg-[#4d4b4b]/70 p-3",
                "ring-white/60 ring-offset-2 ring-offset-[#55b83c] focus:outline-none "
              )}
            >
              <ul>
                {posts.map((post) => (
                  <li
                    key={post.id}
                    className="relative rounded-md mb-3 p-2 bg-[#7a7777]/70"
                  >
                    <h3 className="text-md text-[black] font-medium leading-5">
                      {post.title}
                    </h3>

                    <ul className="mt-1 flex space-x-1 text-md font-normal leading-4 text-[#55b83c]">
                      <li>{post.date}</li>
                      <li>&middot;</li>
                      <li>{post.commentCount} comments</li>
                      <li>&middot;</li>
                      <li>{post.shareCount} shares</li>
                    </ul>

                    <a
                      href="#"
                      className={classNames(
                        "absolute inset-0 rounded-md",
                        " focus:z-10 focus:outline-none focus:ring-2"
                      )}
                    />
                  </li>
                ))}
              </ul>
            </TabPanel>
          ))}
        </TabPanels>
        <TabList className="flex space-x-1 rounded-xl bg-[#4d4b4b]/70 p-1">
          {Object.keys(categories).map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  "w-full rounded-lg py-2.5 text-lg font-medium leading-5",
                  "ring-white/70 ring-offset-2 ring-offset-[#55b83c] focus:outline-none focus:ring-2",
                  selected
                    ? "bg-white/70 text-[#55b83c] shadow"
                    : "text-white"
                )
              }
            >
              {category}
            </Tab>
          ))}
        </TabList>
      </TabGroup>
    </div>
  );
}
