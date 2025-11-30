'use client';

import { useState } from 'react';
import personalData from '@/data/personal.json';
import journeyData from '@/data/journey.json';

interface JourneySection {
  icon: string;
  title: string;
  field: string;
}

interface JourneyContent {
  type: string;
  showPersonalInfo?: boolean;
  fields?: string[];
  showBio?: boolean;
  sections?: JourneySection[];
}

interface JourneyItem {
  id: string;
  title: string;
  color: string;
  icon: string;
  content: JourneyContent;
}

export default function CollapsibleJourney() {
  const [isExpanded, setIsExpanded] = useState(journeyData.defaultExpanded);
  const [expandedItems, setExpandedItems] = useState<string[]>(
    journeyData.items.map((item: JourneyItem) => item.id)
  );

  const toggleItem = (id: string) => {
    setExpandedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const getFieldValue = (field: string): string => {
    return (personalData as Record<string, unknown>)[field] as string || '';
  };

  const renderContent = (item: JourneyItem) => {
    const { content } = item;
    
    if (content.type === 'about') {
      return (
        <div className="space-y-4">
          {content.showBio && <p>{personalData.bio}</p>}
          {content.showPersonalInfo && content.fields && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {content.fields.map(field => (
                <p key={field}>
                  <strong className="capitalize">{field}:</strong> {getFieldValue(field)}
                </p>
              ))}
            </div>
          )}
        </div>
      );
    }

    if (content.sections) {
      return (
        <div className="space-y-4">
          {content.sections.map((section, idx) => (
            <div key={idx}>
              <h5 className="font-semibold mb-2">
                {section.icon} {section.title}
              </h5>
              <p>{getFieldValue(section.field)}</p>
            </div>
          ))}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="journey-container">
      {/* Main Header - Collapsible */}
      <button 
        className="journey-header"
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
      >
        <h2 className="journey-title">{journeyData.title}</h2>
        <span className={`journey-chevron ${isExpanded ? 'expanded' : ''}`}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="6,9 12,15 18,9"></polyline>
          </svg>
        </span>
      </button>
      
      {journeyData.subtitle && (
        <p className="journey-subtitle">{journeyData.subtitle}</p>
      )}

      {/* Journey Items */}
      <div className={`journey-content ${isExpanded ? 'expanded' : 'collapsed'}`}>
        {journeyData.items.map((item: JourneyItem) => (
          <div key={item.id} className="journey-item">
            <button
              className="journey-item-header"
              onClick={() => toggleItem(item.id)}
              aria-expanded={expandedItems.includes(item.id)}
            >
              <div className="journey-item-indicator" style={{ backgroundColor: item.color }} />
              <h3 className="journey-item-title">{item.title}</h3>
              <span className={`journey-item-chevron ${expandedItems.includes(item.id) ? 'expanded' : ''}`}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="6,9 12,15 18,9"></polyline>
                </svg>
              </span>
            </button>
            
            <div className={`journey-item-content ${expandedItems.includes(item.id) ? 'expanded' : 'collapsed'}`}>
              <div className="journey-item-body" style={{ borderLeftColor: item.color }}>
                {renderContent(item)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
