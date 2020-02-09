from enum import Enum


class Topics(Enum):
    # __order__ = 'climate_change immigration terrorism socialist students abortion gun_control homelessness unemployment'
    climate_change = ['climate change', 'global warming', 'global climate', 'climate crisis']
    immigration = ['migration', 'transmigration', 'migrant', 'immigrant', 'border control']
    terrorism = ['terrorism', 'terror', 'violence', 'savagery', 'destructive']
    socialist = ['Social Security', 'Medicare', 'health insurance', 'medical insurance', 'healthcare', 'healthcare',
                 'medical']
    students = ['students', 'student loans', 'college', 'study grants', 'scholarship', 'educational grant',
                'fellowship']
    abortion = ['abortion', 'late-term', 'preborn', 'pre-born', 'womb', 'contraception']
    gun_control = ['gun control', 'gun', 'firearms', 'weapons']
    homelessness = ['homeless', 'destitute', 'vagrant', 'poverty', 'begging']
    unemployment = ['unemployed', 'jobless', 'out of work', 'out of a job', 'unemployment', 'no job', 'layoff']

    # topics = ["Climate Change", "Immigration", "Terrorism",
    #          "Social Security and Medicare", "Student Loans", "Abortion",
    #          "Gun Control", "Homelessness", "Unemployment"]
