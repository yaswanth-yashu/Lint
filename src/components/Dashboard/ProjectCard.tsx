import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Download, Eye, FileText, Trash2 } from 'lucide-react';
import { Project, AnalysisReport } from '../../lib/supabase';

interface ProjectCardProps {
  project: Project;
  report?: AnalysisReport;
  onViewReport: (project: Project) => void;
  onDownloadReport: (project: Project) => void;
  onDeleteProject: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  report,
  onViewReport,
  onDownloadReport,
  onDeleteProject
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'analyzing': return 'bg-blue-100 text-blue-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDebtScoreColor = (score: number) => {
    if (score >= 70) return 'text-red-600';
    if (score >= 40) return 'text-orange-600';
    return 'text-green-600';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {project.project_name}
          </h3>
          <div className="flex items-center space-x-2 text-sm text-gray-500 mb-3">
            <Calendar className="h-4 w-4" />
            <span>{new Date(project.created_at).toLocaleDateString()}</span>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.analysis_status)}`}>
          {project.analysis_status}
        </span>
      </div>

      {report && (
        <div className="mb-4 p-4 bg-gray-50 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Tech Debt Score</span>
            <span className={`text-2xl font-bold ${getDebtScoreColor(report.debt_score)}`}>
              {report.debt_score}/100
            </span>
          </div>
          {report.summary && (
            <p className="text-sm text-gray-600 line-clamp-2">
              {report.summary}
            </p>
          )}
        </div>
      )}

      <div className="flex space-x-2">
        {project.analysis_status === 'completed' && report && (
          <>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onViewReport(project)}
              className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
            >
              <Eye className="h-4 w-4" />
              <span>View Report</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onDownloadReport(project)}
              className="flex items-center justify-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
            >
              <Download className="h-4 w-4" />
            </motion.button>
          </>
        )}
        
        {project.analysis_status === 'analyzing' && (
          <div className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm">
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-600 border-t-transparent"></div>
            <span>Analyzing...</span>
          </div>
        )}

        {project.analysis_status === 'failed' && (
          <div className="flex-1 flex items-center justify-center px-4 py-2 bg-red-100 text-red-700 rounded-lg text-sm">
            <span>Analysis Failed</span>
          </div>
        )}

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onDeleteProject(project)}
          className="flex items-center justify-center px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <Trash2 className="h-4 w-4" />
        </motion.button>
      </div>
    </motion.div>
  );
};