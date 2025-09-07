# AI Wedding Photographer 🤵👰

AI Wedding Photographer lets couples upload two photos (bride and groom separately) and instantly see themselves merged into a realistic wedding photo.  
Using **Gemini 2.5 Flash Image**, the app generates wedding attire, adapts lighting and poses, and places the couple in stunning venues such as beaches, castles, gardens, or ballrooms.  
Couples can also enter a **custom location** for a personalized preview of their big day.

This project was built in **Google AI Studio App Builder** and exported to GitHub for the Google Nano Hackathon.

🔗 **Live Demo (AI Studio):**  
[Click here to try the app](https://ai.studio/apps/drive/1eixZhJ5ujnkEHF82uFAKjSMdYuw1Whfu)

---

## How It Works ✨

1. **Upload Photos** 📸  
   Upload separate photos of the bride and groom.

2. **Choose a Style or Venue** 🏖️🏰🌸  
   Pick from prebuilt wedding scenes like beach, castle, garden, or ballroom, or enter a custom location.

3. **Generate Wedding Preview** 🎉  
   The AI merges both photos, generates outfits, adapts poses and lighting, and outputs a realistic wedding image ready to view, download, or share.

---

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:  
   ```bash
   npm install
2. Set your Gemini API key in .env.local:
   ```bash
   GEMINI_API_KEY=your_key_here
3. Run the app:
   ```bash
   npm run dev
