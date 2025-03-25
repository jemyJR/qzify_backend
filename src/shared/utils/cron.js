const cron = require('node-cron');
const AttemptsService = require('../../features/attempts/attempts.service');

function initCronJobs() {
    cron.schedule('*/20 * * * *', async () => {
        console.log('[Cron] Checking for expired attempts...');
        try {
            const attempts = await AttemptsService.submitExpiredAttempts();
            if (attempts.length > 0) {
                console.log(`[Cron] ${attempts.length} attempts auto-submitted`);
                attempts.forEach(attempt => {
                    console.log(`[Cron] Attempt ${attempt._id} with title "${attempt.title}" submitted with score ${attempt.score}`);
                });
            }

        } catch (error) {
            console.error('[Cron] Error auto-submitting attempts:', error);
        }
    });
}

module.exports = { initCronJobs };