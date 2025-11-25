# memo

## nov 25 2025
- task: use gemini 3 pro rebuild my personal website
- start time: 14:58
- notes: 
    - prompt preparation: ~ 30 min (this part took the majority of human inputs)
        - what i did specifically:
            - prompt: ```
                build my personal website hosted on github.
                Here is all files currently on my website: https://github.com/calvinchengyx/calvinchengyx.github.io
                I would like the website structure similar like this one https://drhailiang.com/. with the following sections:
                - home page, left side as the current setting with photos, and short intro,social media links; right side with first half as a short personal bio, second half with "News Updates", a news section
                - Research (mimic this one https://www.hanshanley.com/publications/, with links to paper and code, if videos )
                - Teaching (mimic https://drhailiang.com/teaching/ this one)
                - Service (mimic this one https://biyingwu.com/service)
                - Award (mimic this one https://biyingwu.com/award-1, use bullet points)
                - Resume (mimic https://www.hanshanley.com/resume/ pape)
                give me the structure and leave specific content with testing text```
            - find example website from my friends for inspiration 
                - wu biying (https://biyingwu.com/)
                - hans hanley (https://www.hanshanley.com/) 
                - dr hailiang (https://drhailiang.com/)
                - jennifer pan (https://www.jenniferpan.com/)
                - diyi liu (https://deeliu97.github.io/)
    - then interact with gemini pro to refine the structure and design, iterated for 15min to get what i want for like 5 rounds
    - gemini pro code generation process each round took about 2-3 min 
    - i added content by automatically uploadin my current website, CV. NOTE that developers should be super cautious as gemini will halucinate content still when transferring content from uploaded documents. for detailed information, it needs scholars to manually check the content.
    - deployment: i want to deploy the code on Github page in my previous repository: https://calvinchengyx.github.io (start from 16:00)
        - i need to use a full new set of java script based github page deployment, as the previous one is jekyll based deployment.
        - followed gemini pro instruction with basically 0 java knowledge, debugged quite a bit, more specifically, copy paste bugs and logs, many times
        - gemini got error that it can not fix to show the website after trying for 40min 
