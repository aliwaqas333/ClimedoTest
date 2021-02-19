import { Request, Response } from "express";
import { Tab } from "../models/Tab";

/**
 * Retrieve all tabs.
 * @route GET /
 */
export const index = async (req: Request, res: Response) => {
  try {
    const tabs = await Tab.find({});
    return res.status(200).send(tabs);
  } catch (error) {
    return res.status(500).json(error);
  }
};

/**
 * Update the tab by id.
 * @route PUT /
 */
export const update = async (req: Request, res: Response) => {
  try {
    await Tab.findByIdAndUpdate(
      req.params.tabId,
      req.body,
      { useFindAndModify: true },
      () => {
        return res.status(200).json({ status: "ok" });
      }
    );
  } catch (error) {
    res.status(500).json(error);
  }
};

/**
 * creates a new tab.
 * @route POST /
 */
export const create = async (req: Request, res: Response) => {
  try {
    const tab = new Tab(req.body);
    await tab.save();
    res.status(201).json({ status: "ok" });
  } catch (error) {
    res.status(500).json(error);
  }
};

/**
 * delete the tab by id.
 * @route DELETE /
 */
export const destroy = async (req: Request, res: Response) => {
  try {
    const tab = await Tab.findByIdAndDelete(req.params.tabId);
    if (!tab) {
      res.status(404).json({ status: "Not found" });
    }
    res.status(200).json({ status: "ok" });
  } catch (error) {
    res.status(500).json(error);
  }
};

/**
 * delete the tab by id.
 * @route DELETE /
 */
export const stats = async (req: Request, res: Response) => {
  try {
    const tabsAll = await await Tab.find({}, ["_id", "dataPoints"]);
    const refinedResult: any = [];
    tabsAll.forEach((tab) => {
      refinedResult.push({
        id: tab._id,
        datapointCount: tab.dataPoints.length,
      });
    });

    refinedResult.sort((a:any, b:any) => {
      if (a.datapointCount > b.datapointCount) {
        return -1;
      }
      if (a.datapointCount < b.datapointCount) {
        return 1;
      }
      // a must be equal to b
      return 0;
    });
    res.status(200).send(refinedResult);
  } catch (error) {
    res.status(500).json(error);
  }
};
