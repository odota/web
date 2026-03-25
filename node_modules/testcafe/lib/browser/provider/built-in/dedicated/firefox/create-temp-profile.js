"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const temp_directory_1 = __importDefault(require("../../../../../utils/temp-directory"));
const promisified_functions_1 = require("../../../../../utils/promisified-functions");
const mime_db_1 = __importDefault(require("mime-db"));
function getMimeTypes() {
    const mimeTypes = Object.keys(mime_db_1.default);
    return mimeTypes.filter(mimeType => {
        // @ts-ignore: Export of the 'mime-db' module has no index signature.
        const { extensions } = mime_db_1.default[mimeType];
        return extensions && extensions.length;
    }).join(',');
}
async function generatePreferences(profileDir, { marionettePort, config }) {
    const prefsFileName = path_1.default.join(profileDir, 'user.js');
    const mimeTypes = getMimeTypes();
    let prefs = [
        'user_pref("browser.link.open_newwindow.override.external", 2);',
        'user_pref("app.update.enabled", false);',
        'user_pref("app.update.auto", false);',
        'user_pref("app.update.mode", 0);',
        'user_pref("app.update.service.enabled", false);',
        'user_pref("browser.shell.checkDefaultBrowser", false);',
        'user_pref("browser.usedOnWindows10", true);',
        'user_pref("browser.rights.3.shown", true);',
        'user_pref("browser.startup.homepage_override.mstone","ignore");',
        'user_pref("browser.tabs.warnOnCloseOtherTabs", false);',
        'user_pref("browser.tabs.warnOnClose", false);',
        'user_pref("browser.sessionstore.resume_from_crash", false);',
        `user_pref("browser.helperApps.neverAsk.saveToDisk", "${mimeTypes}");`,
        `user_pref("pdfjs.disabled", true);`,
        'user_pref("toolkit.telemetry.reportingpolicy.firstRun", false);',
        'user_pref("toolkit.telemetry.enabled", false);',
        'user_pref("toolkit.telemetry.rejected", true);',
        'user_pref("datareporting.healthreport.uploadEnabled", false);',
        'user_pref("datareporting.healthreport.service.enabled", false);',
        'user_pref("datareporting.healthreport.service.firstRun", false);',
        'user_pref("datareporting.policy.dataSubmissionEnabled", false);',
        'user_pref("datareporting.policy.dataSubmissionPolicyBypassNotification", true);',
        'user_pref("app.shield.optoutstudies.enabled", false);',
        'user_pref("extensions.shield-recipe-client.enabled", false);',
        'user_pref("extensions.shield-recipe-client.first_run", false);',
        'user_pref("extensions.shield-recipe-client.startupExperimentPrefs.browser.newtabpage.activity-stream.enabled", false);',
        'user_pref("devtools.toolbox.host", "window");',
        'user_pref("devtools.toolbox.previousHost", "bottom");',
        'user_pref("signon.rememberSignons", false);',
        // NOTE: dom.min_background_timeout_value should be equal to dom.min_timeout_value
        'user_pref("dom.min_background_timeout_value", 4);',
        'user_pref("dom.timeout.throttling_delay", 0);',
        'user_pref("dom.timeout.budget_throttling_max_delay", 0);',
        // NOTE: We set the foreground configuration for the background budget throttling parameters
        'user_pref("dom.timeout.background_throttling_max_budget", -1);',
        'user_pref("dom.timeout.background_budget_regeneration_rate", 1);',
        'user_pref("security.enterprise_roots.enabled", true);',
    ];
    if (marionettePort) {
        prefs = prefs.concat([
            `user_pref("marionette.port", ${marionettePort});`,
            'user_pref("marionette.enabled", true);',
        ]);
    }
    if (config.disableMultiprocessing) {
        prefs = prefs.concat([
            'user_pref("browser.tabs.remote.autostart", false);',
            'user_pref("browser.tabs.remote.autostart.2", false);',
        ]);
    }
    mimeTypes.split(',').forEach(mimeType => {
        const type = mimeType.split('/')[1];
        prefs.push(`user_pref("browser.download.viewableInternally.typeWasRegistered.${type}", true);`);
    });
    await (0, promisified_functions_1.writeFile)(prefsFileName, prefs.join('\n'));
}
async function writeHandlersFile(profileDir) {
    // NOTE: The definitions of actions are there https://searchfox.org/mozilla-release/source/netwerk/mime/nsIMIMEInfo.idl#115
    const handlersFileName = path_1.default.join(profileDir, 'handlers.json');
    const handlers = {
        defaultHandlersVersion: {
            ru: 5,
        },
        mimeTypes: {
            'application/pdf': {
                action: 0,
                extensions: [
                    'pdf',
                ],
            },
            'text/xml': {
                action: 0,
                extensions: [
                    'xml',
                    'xsl',
                    'xbl',
                ],
            },
            'image/svg+xml': {
                action: 0,
                extensions: [
                    'svg',
                ],
            },
            'image/webp': {
                action: 0,
                extensions: [
                    'webp',
                ],
            },
        },
        schemes: {},
    };
    await (0, promisified_functions_1.writeFile)(handlersFileName, JSON.stringify(handlers));
}
async function default_1(runtimeInfo) {
    const tmpDir = await temp_directory_1.default.createDirectory('firefox-profile');
    await generatePreferences(tmpDir.path, runtimeInfo);
    await writeHandlersFile(tmpDir.path);
    return tmpDir;
}
exports.default = default_1;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLXRlbXAtcHJvZmlsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9icm93c2VyL3Byb3ZpZGVyL2J1aWx0LWluL2RlZGljYXRlZC9maXJlZm94L2NyZWF0ZS10ZW1wLXByb2ZpbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxnREFBd0I7QUFDeEIseUZBQWdFO0FBQ2hFLHNGQUF1RTtBQUN2RSxzREFBeUI7QUFFekIsU0FBUyxZQUFZO0lBQ2pCLE1BQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsaUJBQUUsQ0FBQyxDQUFDO0lBRWxDLE9BQU8sU0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsRUFBRTtRQUMvQixxRUFBcUU7UUFDckUsTUFBTSxFQUFFLFVBQVUsRUFBRSxHQUFHLGlCQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFcEMsT0FBTyxVQUFVLElBQUksVUFBVSxDQUFDLE1BQU0sQ0FBQztJQUMzQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDakIsQ0FBQztBQUVELEtBQUssVUFBVSxtQkFBbUIsQ0FBRSxVQUFrQixFQUFFLEVBQUUsY0FBYyxFQUFFLE1BQU0sRUFBMkM7SUFDdkgsTUFBTSxhQUFhLEdBQUcsY0FBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDdkQsTUFBTSxTQUFTLEdBQUcsWUFBWSxFQUFFLENBQUM7SUFFakMsSUFBSSxLQUFLLEdBQUc7UUFDUixnRUFBZ0U7UUFDaEUseUNBQXlDO1FBQ3pDLHNDQUFzQztRQUN0QyxrQ0FBa0M7UUFDbEMsaURBQWlEO1FBQ2pELHdEQUF3RDtRQUN4RCw2Q0FBNkM7UUFDN0MsNENBQTRDO1FBQzVDLGlFQUFpRTtRQUNqRSx3REFBd0Q7UUFDeEQsK0NBQStDO1FBQy9DLDZEQUE2RDtRQUM3RCx3REFBd0QsU0FBUyxLQUFLO1FBQ3RFLG9DQUFvQztRQUNwQyxpRUFBaUU7UUFDakUsZ0RBQWdEO1FBQ2hELGdEQUFnRDtRQUNoRCwrREFBK0Q7UUFDL0QsaUVBQWlFO1FBQ2pFLGtFQUFrRTtRQUNsRSxpRUFBaUU7UUFDakUsaUZBQWlGO1FBQ2pGLHVEQUF1RDtRQUN2RCw4REFBOEQ7UUFDOUQsZ0VBQWdFO1FBQ2hFLHdIQUF3SDtRQUN4SCwrQ0FBK0M7UUFDL0MsdURBQXVEO1FBQ3ZELDZDQUE2QztRQUM3QyxrRkFBa0Y7UUFDbEYsbURBQW1EO1FBQ25ELCtDQUErQztRQUMvQywwREFBMEQ7UUFDMUQsNEZBQTRGO1FBQzVGLGdFQUFnRTtRQUNoRSxrRUFBa0U7UUFDbEUsdURBQXVEO0tBQzFELENBQUM7SUFFRixJQUFJLGNBQWMsRUFBRTtRQUNoQixLQUFLLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQztZQUNqQixnQ0FBZ0MsY0FBYyxJQUFJO1lBQ2xELHdDQUF3QztTQUMzQyxDQUFDLENBQUM7S0FDTjtJQUVELElBQUksTUFBTSxDQUFDLHNCQUFzQixFQUFFO1FBQy9CLEtBQUssR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDO1lBQ2pCLG9EQUFvRDtZQUNwRCxzREFBc0Q7U0FDekQsQ0FBQyxDQUFDO0tBQ047SUFFRCxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsRUFBRTtRQUNwQyxNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRXBDLEtBQUssQ0FBQyxJQUFJLENBQUMsb0VBQW9FLElBQUksV0FBVyxDQUFDLENBQUM7SUFDcEcsQ0FBQyxDQUFDLENBQUM7SUFFSCxNQUFNLElBQUEsaUNBQVMsRUFBQyxhQUFhLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0FBQ3JELENBQUM7QUFFRCxLQUFLLFVBQVUsaUJBQWlCLENBQUUsVUFBa0I7SUFDaEQsMkhBQTJIO0lBQzNILE1BQU0sZ0JBQWdCLEdBQUcsY0FBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsZUFBZSxDQUFDLENBQUM7SUFDaEUsTUFBTSxRQUFRLEdBQVc7UUFDckIsc0JBQXNCLEVBQUU7WUFDcEIsRUFBRSxFQUFFLENBQUM7U0FDUjtRQUNELFNBQVMsRUFBRTtZQUNQLGlCQUFpQixFQUFFO2dCQUNmLE1BQU0sRUFBTSxDQUFDO2dCQUNiLFVBQVUsRUFBRTtvQkFDUixLQUFLO2lCQUNSO2FBQ0o7WUFDRCxVQUFVLEVBQUU7Z0JBQ1IsTUFBTSxFQUFNLENBQUM7Z0JBQ2IsVUFBVSxFQUFFO29CQUNSLEtBQUs7b0JBQ0wsS0FBSztvQkFDTCxLQUFLO2lCQUNSO2FBQ0o7WUFDRCxlQUFlLEVBQUU7Z0JBQ2IsTUFBTSxFQUFNLENBQUM7Z0JBQ2IsVUFBVSxFQUFFO29CQUNSLEtBQUs7aUJBQ1I7YUFDSjtZQUNELFlBQVksRUFBRTtnQkFDVixNQUFNLEVBQU0sQ0FBQztnQkFDYixVQUFVLEVBQUU7b0JBQ1IsTUFBTTtpQkFDVDthQUNKO1NBQ0o7UUFDRCxPQUFPLEVBQUUsRUFBRTtLQUNkLENBQUM7SUFFRixNQUFNLElBQUEsaUNBQVMsRUFBQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7QUFDaEUsQ0FBQztBQUdjLEtBQUssb0JBQVcsV0FBZ0I7SUFDM0MsTUFBTSxNQUFNLEdBQUcsTUFBTSx3QkFBYSxDQUFDLGVBQWUsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBRXRFLE1BQU0sbUJBQW1CLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxXQUFXLENBQUMsQ0FBQztJQUNwRCxNQUFNLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUVyQyxPQUFPLE1BQU0sQ0FBQztBQUNsQixDQUFDO0FBUEQsNEJBT0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCBUZW1wRGlyZWN0b3J5IGZyb20gJy4uLy4uLy4uLy4uLy4uL3V0aWxzL3RlbXAtZGlyZWN0b3J5JztcbmltcG9ydCB7IHdyaXRlRmlsZSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3V0aWxzL3Byb21pc2lmaWVkLWZ1bmN0aW9ucyc7XG5pbXBvcnQgZGIgZnJvbSAnbWltZS1kYic7XG5cbmZ1bmN0aW9uIGdldE1pbWVUeXBlcyAoKTogc3RyaW5nIHtcbiAgICBjb25zdCBtaW1lVHlwZXMgPSBPYmplY3Qua2V5cyhkYik7XG5cbiAgICByZXR1cm4gbWltZVR5cGVzLmZpbHRlcihtaW1lVHlwZSA9PiB7XG4gICAgICAgIC8vIEB0cy1pZ25vcmU6IEV4cG9ydCBvZiB0aGUgJ21pbWUtZGInIG1vZHVsZSBoYXMgbm8gaW5kZXggc2lnbmF0dXJlLlxuICAgICAgICBjb25zdCB7IGV4dGVuc2lvbnMgfSA9IGRiW21pbWVUeXBlXTtcblxuICAgICAgICByZXR1cm4gZXh0ZW5zaW9ucyAmJiBleHRlbnNpb25zLmxlbmd0aDtcbiAgICB9KS5qb2luKCcsJyk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdlbmVyYXRlUHJlZmVyZW5jZXMgKHByb2ZpbGVEaXI6IHN0cmluZywgeyBtYXJpb25ldHRlUG9ydCwgY29uZmlnIH06IHsgbWFyaW9uZXR0ZVBvcnQ6IG51bWJlcjsgY29uZmlnOiBhbnkgfSk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHByZWZzRmlsZU5hbWUgPSBwYXRoLmpvaW4ocHJvZmlsZURpciwgJ3VzZXIuanMnKTtcbiAgICBjb25zdCBtaW1lVHlwZXMgPSBnZXRNaW1lVHlwZXMoKTtcblxuICAgIGxldCBwcmVmcyA9IFtcbiAgICAgICAgJ3VzZXJfcHJlZihcImJyb3dzZXIubGluay5vcGVuX25ld3dpbmRvdy5vdmVycmlkZS5leHRlcm5hbFwiLCAyKTsnLFxuICAgICAgICAndXNlcl9wcmVmKFwiYXBwLnVwZGF0ZS5lbmFibGVkXCIsIGZhbHNlKTsnLFxuICAgICAgICAndXNlcl9wcmVmKFwiYXBwLnVwZGF0ZS5hdXRvXCIsIGZhbHNlKTsnLFxuICAgICAgICAndXNlcl9wcmVmKFwiYXBwLnVwZGF0ZS5tb2RlXCIsIDApOycsXG4gICAgICAgICd1c2VyX3ByZWYoXCJhcHAudXBkYXRlLnNlcnZpY2UuZW5hYmxlZFwiLCBmYWxzZSk7JyxcbiAgICAgICAgJ3VzZXJfcHJlZihcImJyb3dzZXIuc2hlbGwuY2hlY2tEZWZhdWx0QnJvd3NlclwiLCBmYWxzZSk7JyxcbiAgICAgICAgJ3VzZXJfcHJlZihcImJyb3dzZXIudXNlZE9uV2luZG93czEwXCIsIHRydWUpOycsXG4gICAgICAgICd1c2VyX3ByZWYoXCJicm93c2VyLnJpZ2h0cy4zLnNob3duXCIsIHRydWUpOycsXG4gICAgICAgICd1c2VyX3ByZWYoXCJicm93c2VyLnN0YXJ0dXAuaG9tZXBhZ2Vfb3ZlcnJpZGUubXN0b25lXCIsXCJpZ25vcmVcIik7JyxcbiAgICAgICAgJ3VzZXJfcHJlZihcImJyb3dzZXIudGFicy53YXJuT25DbG9zZU90aGVyVGFic1wiLCBmYWxzZSk7JyxcbiAgICAgICAgJ3VzZXJfcHJlZihcImJyb3dzZXIudGFicy53YXJuT25DbG9zZVwiLCBmYWxzZSk7JyxcbiAgICAgICAgJ3VzZXJfcHJlZihcImJyb3dzZXIuc2Vzc2lvbnN0b3JlLnJlc3VtZV9mcm9tX2NyYXNoXCIsIGZhbHNlKTsnLFxuICAgICAgICBgdXNlcl9wcmVmKFwiYnJvd3Nlci5oZWxwZXJBcHBzLm5ldmVyQXNrLnNhdmVUb0Rpc2tcIiwgXCIke21pbWVUeXBlc31cIik7YCxcbiAgICAgICAgYHVzZXJfcHJlZihcInBkZmpzLmRpc2FibGVkXCIsIHRydWUpO2AsXG4gICAgICAgICd1c2VyX3ByZWYoXCJ0b29sa2l0LnRlbGVtZXRyeS5yZXBvcnRpbmdwb2xpY3kuZmlyc3RSdW5cIiwgZmFsc2UpOycsXG4gICAgICAgICd1c2VyX3ByZWYoXCJ0b29sa2l0LnRlbGVtZXRyeS5lbmFibGVkXCIsIGZhbHNlKTsnLFxuICAgICAgICAndXNlcl9wcmVmKFwidG9vbGtpdC50ZWxlbWV0cnkucmVqZWN0ZWRcIiwgdHJ1ZSk7JyxcbiAgICAgICAgJ3VzZXJfcHJlZihcImRhdGFyZXBvcnRpbmcuaGVhbHRocmVwb3J0LnVwbG9hZEVuYWJsZWRcIiwgZmFsc2UpOycsXG4gICAgICAgICd1c2VyX3ByZWYoXCJkYXRhcmVwb3J0aW5nLmhlYWx0aHJlcG9ydC5zZXJ2aWNlLmVuYWJsZWRcIiwgZmFsc2UpOycsXG4gICAgICAgICd1c2VyX3ByZWYoXCJkYXRhcmVwb3J0aW5nLmhlYWx0aHJlcG9ydC5zZXJ2aWNlLmZpcnN0UnVuXCIsIGZhbHNlKTsnLFxuICAgICAgICAndXNlcl9wcmVmKFwiZGF0YXJlcG9ydGluZy5wb2xpY3kuZGF0YVN1Ym1pc3Npb25FbmFibGVkXCIsIGZhbHNlKTsnLFxuICAgICAgICAndXNlcl9wcmVmKFwiZGF0YXJlcG9ydGluZy5wb2xpY3kuZGF0YVN1Ym1pc3Npb25Qb2xpY3lCeXBhc3NOb3RpZmljYXRpb25cIiwgdHJ1ZSk7JyxcbiAgICAgICAgJ3VzZXJfcHJlZihcImFwcC5zaGllbGQub3B0b3V0c3R1ZGllcy5lbmFibGVkXCIsIGZhbHNlKTsnLFxuICAgICAgICAndXNlcl9wcmVmKFwiZXh0ZW5zaW9ucy5zaGllbGQtcmVjaXBlLWNsaWVudC5lbmFibGVkXCIsIGZhbHNlKTsnLFxuICAgICAgICAndXNlcl9wcmVmKFwiZXh0ZW5zaW9ucy5zaGllbGQtcmVjaXBlLWNsaWVudC5maXJzdF9ydW5cIiwgZmFsc2UpOycsXG4gICAgICAgICd1c2VyX3ByZWYoXCJleHRlbnNpb25zLnNoaWVsZC1yZWNpcGUtY2xpZW50LnN0YXJ0dXBFeHBlcmltZW50UHJlZnMuYnJvd3Nlci5uZXd0YWJwYWdlLmFjdGl2aXR5LXN0cmVhbS5lbmFibGVkXCIsIGZhbHNlKTsnLFxuICAgICAgICAndXNlcl9wcmVmKFwiZGV2dG9vbHMudG9vbGJveC5ob3N0XCIsIFwid2luZG93XCIpOycsXG4gICAgICAgICd1c2VyX3ByZWYoXCJkZXZ0b29scy50b29sYm94LnByZXZpb3VzSG9zdFwiLCBcImJvdHRvbVwiKTsnLFxuICAgICAgICAndXNlcl9wcmVmKFwic2lnbm9uLnJlbWVtYmVyU2lnbm9uc1wiLCBmYWxzZSk7JyxcbiAgICAgICAgLy8gTk9URTogZG9tLm1pbl9iYWNrZ3JvdW5kX3RpbWVvdXRfdmFsdWUgc2hvdWxkIGJlIGVxdWFsIHRvIGRvbS5taW5fdGltZW91dF92YWx1ZVxuICAgICAgICAndXNlcl9wcmVmKFwiZG9tLm1pbl9iYWNrZ3JvdW5kX3RpbWVvdXRfdmFsdWVcIiwgNCk7JyxcbiAgICAgICAgJ3VzZXJfcHJlZihcImRvbS50aW1lb3V0LnRocm90dGxpbmdfZGVsYXlcIiwgMCk7JyxcbiAgICAgICAgJ3VzZXJfcHJlZihcImRvbS50aW1lb3V0LmJ1ZGdldF90aHJvdHRsaW5nX21heF9kZWxheVwiLCAwKTsnLFxuICAgICAgICAvLyBOT1RFOiBXZSBzZXQgdGhlIGZvcmVncm91bmQgY29uZmlndXJhdGlvbiBmb3IgdGhlIGJhY2tncm91bmQgYnVkZ2V0IHRocm90dGxpbmcgcGFyYW1ldGVyc1xuICAgICAgICAndXNlcl9wcmVmKFwiZG9tLnRpbWVvdXQuYmFja2dyb3VuZF90aHJvdHRsaW5nX21heF9idWRnZXRcIiwgLTEpOycsXG4gICAgICAgICd1c2VyX3ByZWYoXCJkb20udGltZW91dC5iYWNrZ3JvdW5kX2J1ZGdldF9yZWdlbmVyYXRpb25fcmF0ZVwiLCAxKTsnLFxuICAgICAgICAndXNlcl9wcmVmKFwic2VjdXJpdHkuZW50ZXJwcmlzZV9yb290cy5lbmFibGVkXCIsIHRydWUpOycsXG4gICAgXTtcblxuICAgIGlmIChtYXJpb25ldHRlUG9ydCkge1xuICAgICAgICBwcmVmcyA9IHByZWZzLmNvbmNhdChbXG4gICAgICAgICAgICBgdXNlcl9wcmVmKFwibWFyaW9uZXR0ZS5wb3J0XCIsICR7bWFyaW9uZXR0ZVBvcnR9KTtgLFxuICAgICAgICAgICAgJ3VzZXJfcHJlZihcIm1hcmlvbmV0dGUuZW5hYmxlZFwiLCB0cnVlKTsnLFxuICAgICAgICBdKTtcbiAgICB9XG5cbiAgICBpZiAoY29uZmlnLmRpc2FibGVNdWx0aXByb2Nlc3NpbmcpIHtcbiAgICAgICAgcHJlZnMgPSBwcmVmcy5jb25jYXQoW1xuICAgICAgICAgICAgJ3VzZXJfcHJlZihcImJyb3dzZXIudGFicy5yZW1vdGUuYXV0b3N0YXJ0XCIsIGZhbHNlKTsnLFxuICAgICAgICAgICAgJ3VzZXJfcHJlZihcImJyb3dzZXIudGFicy5yZW1vdGUuYXV0b3N0YXJ0LjJcIiwgZmFsc2UpOycsXG4gICAgICAgIF0pO1xuICAgIH1cblxuICAgIG1pbWVUeXBlcy5zcGxpdCgnLCcpLmZvckVhY2gobWltZVR5cGUgPT4ge1xuICAgICAgICBjb25zdCB0eXBlID0gbWltZVR5cGUuc3BsaXQoJy8nKVsxXTtcblxuICAgICAgICBwcmVmcy5wdXNoKGB1c2VyX3ByZWYoXCJicm93c2VyLmRvd25sb2FkLnZpZXdhYmxlSW50ZXJuYWxseS50eXBlV2FzUmVnaXN0ZXJlZC4ke3R5cGV9XCIsIHRydWUpO2ApO1xuICAgIH0pO1xuXG4gICAgYXdhaXQgd3JpdGVGaWxlKHByZWZzRmlsZU5hbWUsIHByZWZzLmpvaW4oJ1xcbicpKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gd3JpdGVIYW5kbGVyc0ZpbGUgKHByb2ZpbGVEaXI6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgIC8vIE5PVEU6IFRoZSBkZWZpbml0aW9ucyBvZiBhY3Rpb25zIGFyZSB0aGVyZSBodHRwczovL3NlYXJjaGZveC5vcmcvbW96aWxsYS1yZWxlYXNlL3NvdXJjZS9uZXR3ZXJrL21pbWUvbnNJTUlNRUluZm8uaWRsIzExNVxuICAgIGNvbnN0IGhhbmRsZXJzRmlsZU5hbWUgPSBwYXRoLmpvaW4ocHJvZmlsZURpciwgJ2hhbmRsZXJzLmpzb24nKTtcbiAgICBjb25zdCBoYW5kbGVycyAgICAgICAgID0ge1xuICAgICAgICBkZWZhdWx0SGFuZGxlcnNWZXJzaW9uOiB7XG4gICAgICAgICAgICBydTogNSxcbiAgICAgICAgfSxcbiAgICAgICAgbWltZVR5cGVzOiB7XG4gICAgICAgICAgICAnYXBwbGljYXRpb24vcGRmJzoge1xuICAgICAgICAgICAgICAgIGFjdGlvbjogICAgIDAsXG4gICAgICAgICAgICAgICAgZXh0ZW5zaW9uczogW1xuICAgICAgICAgICAgICAgICAgICAncGRmJyxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICd0ZXh0L3htbCc6IHtcbiAgICAgICAgICAgICAgICBhY3Rpb246ICAgICAwLFxuICAgICAgICAgICAgICAgIGV4dGVuc2lvbnM6IFtcbiAgICAgICAgICAgICAgICAgICAgJ3htbCcsXG4gICAgICAgICAgICAgICAgICAgICd4c2wnLFxuICAgICAgICAgICAgICAgICAgICAneGJsJyxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICdpbWFnZS9zdmcreG1sJzoge1xuICAgICAgICAgICAgICAgIGFjdGlvbjogICAgIDAsXG4gICAgICAgICAgICAgICAgZXh0ZW5zaW9uczogW1xuICAgICAgICAgICAgICAgICAgICAnc3ZnJyxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICdpbWFnZS93ZWJwJzoge1xuICAgICAgICAgICAgICAgIGFjdGlvbjogICAgIDAsXG4gICAgICAgICAgICAgICAgZXh0ZW5zaW9uczogW1xuICAgICAgICAgICAgICAgICAgICAnd2VicCcsXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIHNjaGVtZXM6IHt9LFxuICAgIH07XG5cbiAgICBhd2FpdCB3cml0ZUZpbGUoaGFuZGxlcnNGaWxlTmFtZSwgSlNPTi5zdHJpbmdpZnkoaGFuZGxlcnMpKTtcbn1cblxuXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbiAocnVudGltZUluZm86IGFueSk6IFByb21pc2U8VGVtcERpcmVjdG9yeT4ge1xuICAgIGNvbnN0IHRtcERpciA9IGF3YWl0IFRlbXBEaXJlY3RvcnkuY3JlYXRlRGlyZWN0b3J5KCdmaXJlZm94LXByb2ZpbGUnKTtcblxuICAgIGF3YWl0IGdlbmVyYXRlUHJlZmVyZW5jZXModG1wRGlyLnBhdGgsIHJ1bnRpbWVJbmZvKTtcbiAgICBhd2FpdCB3cml0ZUhhbmRsZXJzRmlsZSh0bXBEaXIucGF0aCk7XG5cbiAgICByZXR1cm4gdG1wRGlyO1xufVxuIl19