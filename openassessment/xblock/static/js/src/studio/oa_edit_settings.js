/**
Editing interface for OpenAssessment settings (including assessments).

Args:
    element (DOM element): The DOM element representing this view.
    assessmentViews (array): List of assessment view objects.

Returns:
    OpenAssessment.EditSettingsView

**/
OpenAssessment.EditSettingsView = function(element, assessmentViews) {
    this.settingsElement = element;
    this.assessmentsElement = $('#openassessment_assessment_module_settings_editors',
        $(element).closest('#oa_settings_editor_wrapper'));
    this.assessmentViews = assessmentViews;
};


OpenAssessment.EditSettingsView.prototype = {

    /**
    Get or set the display name of the problem.

    Args:
        name (string, optional): If provided, set the display name.

    Returns:
        string

    **/
    displayName: function(name) {
        var sel = $("#openassessment_title_editor", this.settingsElement);
        return OpenAssessment.Fields.stringField(sel, name);
    },

    /**
    Get or set the submission start date.

    Args:
        datetime (string, optional): If provided, set the datetime.

    Returns:
        string (ISO-format UTC datetime)

    **/
    submissionStart: function(datetime) {
        var sel = $("#openassessment_submission_start_editor", this.settingsElement);
        return OpenAssessment.Fields.datetimeField(sel, datetime);
    },

    /**
    Get or set the submission end date.

    Args:
        datetime (string, optional): If provided, set the datetime.

    Returns:
        string (ISO-format UTC datetime)

    **/
    submissionDue: function(datetime) {
        var sel = $("#openassessment_submission_start_editor", this.settingsElement);
        return OpenAssessment.Fields.datetimeField(sel, datetime);
    },

    /**
    Enable / disable image submission.

    Args:
        isEnabled (boolean, optional): If provided, enable/disable image submission.

    Returns:
        boolean

    **/
    imageSubmissionEnabled: function(isEnabled) {
        var sel = $("#openassessment_submission_image_editor", this.settingsElement);
        if (typeof(isEnabled) !== "undefined") {
            if (isEnabled) { sel.val(1); }
            else { sel.val(0); }
        }
        return (sel.val() == 1);
    },

    /**
    Construct a list of enabled assessments and their properties.

    Returns:
        list of object literals representing the assessments.

    Example usage:
    >>> editSettingsView.assessmentsDescription()
    [
        {
            name: "peer-assessment",
            start: "2014-04-01T00:00",
            due: null
            must_grade: 5,
            must_be_graded_by: 2,
        },
        {
            name: "self-assessment",
            start: null,
            due: null
        }
    ]
    **/
    assessmentsDescription: function() {
        var assessmentDescList = [];
        var view = this;
        // Finds all assessment modules within our element in the DOM, and appends their definitions to the DescList
        $('.openassessment_assessment_module_settings_editor', this.assessmentsElement).each( function () {
            var asmntView = view.assessmentViews[$(this).attr('id')];
            if (asmntView.isEnabled()) {
                var description = asmntView.description();
                description["name"] = asmntView.name;
                assessmentDescList.push(description);
            }
        });
        return assessmentDescList;
    }
};