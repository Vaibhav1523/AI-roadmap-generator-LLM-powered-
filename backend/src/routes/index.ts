import { Router } from 'express';
import authRoutes from '../auth/auth.routes';
import usersRoutes from '../modules/users/users.routes';
import profilesRoutes from '../modules/profiles/profiles.routes';
import careerGoalsRoutes from '../modules/career-goals/career-goals.routes';
import skillsRoutes from '../modules/skills/skills.routes';
import gapAnalysisRoutes from '../modules/gap-analysis/gap-analysis.routes';
import roadmapsRoutes, { milestonesRouter } from '../modules/roadmaps/roadmaps.routes';
import progressRoutes from '../modules/progress/progress.routes';
import mentorsRoutes from '../modules/mentors/mentors.routes';
import notificationsRoutes from '../modules/notifications/notifications.routes';
import analyticsRoutes from '../modules/analytics/analytics.routes';
import adminRoutes from '../modules/admin/admin.routes';
import projectsRoutes from '../modules/projects/projects.routes';

const router = Router();

router.get('/', (_req, res) => {
  res.json({
    success: true,
    message: 'ACRG API v1 is running',
    version: 'v1',
    docs: '/api-docs',
    endpoints: {
      auth: '/api/v1/auth',
      skills: '/api/v1/skills',
      roadmaps: '/api/v1/roadmaps',
      profiles: '/api/v1/profiles',
      careerGoals: '/api/v1/career-goals',
      gapAnalysis: '/api/v1/gap-analysis',
      projects: '/api/v1/projects'
    }
  });
});

router.use('/auth', authRoutes);
router.use('/users', usersRoutes);
router.use('/profiles', profilesRoutes);
router.use('/career-goals', careerGoalsRoutes);
router.use('/', skillsRoutes);
router.use('/gap-analysis', gapAnalysisRoutes);
router.use('/roadmaps', roadmapsRoutes);
router.use('/milestones', milestonesRouter);
router.use('/progress', progressRoutes);
router.use('/mentor-reviews', mentorsRoutes);
router.use('/notifications', notificationsRoutes);
router.use('/analytics', analyticsRoutes);
router.use('/admin', adminRoutes);
router.use('/projects', projectsRoutes);

export default router;
