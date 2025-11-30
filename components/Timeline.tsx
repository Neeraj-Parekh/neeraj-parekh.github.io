'use client';

interface TimelineItem {
  title: string;
  color: string;
  content: React.ReactNode;
}

interface TimelineProps {
  items: TimelineItem[];
}

export default function Timeline({ items }: TimelineProps) {
  return (
    <div className="timeline-container relative">
      {/* Vertical line */}
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300 dark:bg-gray-700" />
      
      <ul className="space-y-12">
        {items.map((item, index) => (
          <li key={index} className="relative pl-20">
            {/* Badge/Dot */}
            <div 
              className="absolute left-4 w-8 h-8 rounded-full flex items-center justify-center shadow-lg"
              style={{ backgroundColor: item.color }}
            >
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            {/* Content Panel */}
            <div className="timeline-panel bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300">
              <h4 className="timeline-title text-xl font-bold mb-4" style={{ color: item.color }}>
                {item.title}
              </h4>
              <div className="timeline-body text-gray-700 dark:text-gray-300">
                {item.content}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
